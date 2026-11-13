"""Pipeline: fetch NASA data -> harmonize/merge with pandas -> Grok -> validated response."""
from __future__ import annotations

import datetime as dt

import httpx
import pandas as pd

import config
import grok_client
import harmonize
import nasa_client


def level(score: float) -> str:
    return "extreme" if score >= 75 else "high" if score >= 55 else "moderate" if score >= 30 else "low"


def baseline_scores(tl: pd.DataFrame, ctx: dict) -> list[dict]:
    """Transparent rule-based score. Given to Grok as a reference and used if Grok fails."""
    fc = tl[tl["is_forecast"]]
    pressure = min(ctx["hotspots_last_5d"]["events"], 20) * 1.5
    dry = min(ctx["dry_days"], 14) * 1.5
    out = []
    nz = lambda x: 0.0 if pd.isna(x) else float(x)  # missing forecast values count as 0
    for date, d in fc.iterrows():
        rh = d.get("rh_min_pct")
        raw = (
            max(0.0, nz(d["tmax_c"]) - 28) * 3
            + (max(0.0, 45 - rh) if pd.notna(rh) else 0)
            + nz(d["wind_kmh"]) * 0.8
            - nz(d["rain_mm"]) * 6
            + pressure
            + dry
        )
        s = int(max(0, min(100, round(raw))))
        out.append({"date": date.strftime("%Y-%m-%d"), "score": s, "level": level(s)})
    return out


def _forecast_rows(tl: pd.DataFrame, baseline: list[dict]) -> list[dict]:
    fc = tl[tl["is_forecast"]][["tmax_c", "rh_min_pct", "rain_mm", "wind_kmh"]].copy()
    fc.index = fc.index.strftime("%Y-%m-%d")
    base = {b["date"]: b["score"] for b in baseline}
    rows = harmonize.records(fc.reset_index())
    for r in rows:
        r["baseline_score"] = base.get(r["date"])
    return rows


def _merge_grok(baseline: list[dict], grok_days: list[dict], hotspots_ok: bool = True) -> tuple[list[dict], str]:
    g = {}
    for d in grok_days:
        try:
            g[str(d["date"])[:10]] = (max(0, min(100, int(round(float(d["score"]))))), str(d.get("reason", ""))[:140])
        except (KeyError, TypeError, ValueError):
            continue
    days, used = [], 0
    for b in baseline:
        if b["date"] in g:
            score, reason = g[b["date"]]
            used += 1
        else:
            score = b["score"]
            reason = ("Rule-based estimate (heat, dryness, wind, recent hotspots)" if hotspots_ok
                      else "Weather-only estimate: NASA hotspot data unavailable")
        days.append({"date": b["date"], "score": score, "level": level(score), "reason": reason})
    source = "grok" if used == len(baseline) else ("grok+baseline" if used else "baseline")
    return days, source


def run_prediction(lat: float, lon: float) -> dict:
    notes: list[str] = []
    with httpx.Client() as client:
        raw, hotspots_ok = nasa_client.fetch_firms(client, lat, lon, 5, notes)
        history = nasa_client.fetch_power(client, lat, lon, config.HISTORY_DAYS, notes)
        forecast = nasa_client.fetch_forecast(client, lat, lon, config.FORECAST_DAYS, notes)
        if forecast.empty:
            raise RuntimeError("weather forecast unavailable: " + "; ".join(notes))

        events = harmonize.harmonize_hotspots(raw)
        timeline = harmonize.build_timeline(history, forecast, events)
        ctx = harmonize.summarize(timeline, events)
        baseline = baseline_scores(timeline, ctx)

        grok_input = {
            "location": {"lat": lat, "lon": lon},
            "hotspots_last_5d": ctx["hotspots_last_5d"],
            "recent_weather_nasa_power": ctx["recent_weather_nasa_power"],
            "forecast_days": _forecast_rows(timeline, baseline),
        }
        grok_days = []
        if config.XAI_API_KEY:
            try:
                grok_days = grok_client.predict(client, grok_input)
            except Exception as e:
                notes.append(f"Grok failed ({type(e).__name__}): using rule-based scores")
        else:
            notes.append("Grok disabled (no XAI_API_KEY): using rule-based scores")

    days, source = _merge_grok(baseline, grok_days, hotspots_ok)
    return {
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
        "location": {"lat": lat, "lon": lon},
        "source": source,
        "hotspots_available": hotspots_ok,
        "hotspots": ctx["hotspots_last_5d"],
        "recent_weather": ctx["recent_weather_nasa_power"],
        "days": days,
        "notes": notes,
    }


def run_hotspots(lat: float, lon: float, days: int = 5) -> dict:
    notes: list[str] = []
    with httpx.Client() as client:
        raw, ok = nasa_client.fetch_firms(client, lat, lon, days, notes)
    events = harmonize.harmonize_hotspots(raw)
    return {"available": ok, "count": int(len(events)), "events": harmonize.records(events), "notes": notes}