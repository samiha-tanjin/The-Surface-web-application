"""Harmonization: put MODIS and VIIRS detections on one scale, merge duplicates seen by
several sensors/satellites, then join hotspot activity with weather into one daily timeline."""
from __future__ import annotations

import numpy as np
import pandas as pd

import config

CONF_MAP = {"l": 25.0, "n": 60.0, "h": 90.0}  # VIIRS low/nominal/high -> 0-100 (our assumption)
CELL_DECIMALS = 2  # ~1.1 km grid: MODIS pixel ~1 km, VIIRS ~375 m
EVENT_COLS = ["lat", "lon", "date", "frp_mw", "confidence", "brightness_k", "sensors", "n_sensors",
              "n_detections", "both_modis_viirs", "first_seen"]


def _col(df: pd.DataFrame, name: str) -> pd.Series:
    return pd.to_numeric(df[name], errors="coerce") if name in df.columns else pd.Series(np.nan, index=df.index)


def _norm_conf(v) -> float:
    s = str(v).strip().lower()
    if s in CONF_MAP:
        return CONF_MAP[s]
    try:
        return float(s)  # MODIS gives a 0-100 percentage
    except ValueError:
        return np.nan


def harmonize_hotspots(raw: pd.DataFrame) -> pd.DataFrame:
    """Raw FIRMS rows (mixed MODIS/VIIRS) -> one row per fire 'event' (grid cell + day)."""
    if raw.empty:
        return pd.DataFrame(columns=EVENT_COLS)
    df = raw.copy()
    inst = df["instrument"].astype(str).str.upper().str.strip() if "instrument" in df.columns else df["source"].str.split("_").str[0]
    df["sensor"] = np.where(inst.str.contains("MODIS"), "MODIS", "VIIRS")
    df["brightness_k"] = _col(df, "brightness").fillna(_col(df, "bright_ti4"))  # MODIS vs VIIRS column
    df["confidence_n"] = df["confidence"].map(_norm_conf)
    df["frp_mw"] = _col(df, "frp")
    df["lat"] = _col(df, "latitude")
    df["lon"] = _col(df, "longitude")
    df["date"] = pd.to_datetime(df["acq_date"], errors="coerce").dt.normalize()
    t = df["acq_time"].astype(str).str.zfill(4) if "acq_time" in df.columns else "0000"
    df["seen_at"] = pd.to_datetime(df["acq_date"].astype(str) + " " + t, format="%Y-%m-%d %H%M", errors="coerce")

    df = df.dropna(subset=["lat", "lon", "date"])
    df = df[df["confidence_n"].fillna(0) >= config.MIN_CONFIDENCE]  # drop low-confidence / likely false alarms
    if df.empty:
        return pd.DataFrame(columns=EVENT_COLS)

    df["cell_lat"] = df["lat"].round(CELL_DECIMALS)
    df["cell_lon"] = df["lon"].round(CELL_DECIMALS)
    g = df.groupby(["cell_lat", "cell_lon", "date"], as_index=False).agg(
        lat=("lat", "mean"),
        lon=("lon", "mean"),
        frp_mw=("frp_mw", "max"),
        confidence=("confidence_n", "max"),
        brightness_k=("brightness_k", "max"),
        sensors=("sensor", lambda s: "+".join(sorted(set(s)))),
        n_sensors=("sensor", "nunique"),
        n_detections=("sensor", "size"),
        first_seen=("seen_at", "min"),
    )
    g["both_modis_viirs"] = g["n_sensors"] > 1  # same spot, same day, seen by both instruments
    return g[EVENT_COLS].sort_values("date").reset_index(drop=True)


def daily_hotspots(events: pd.DataFrame) -> pd.DataFrame:
    if events.empty:
        return pd.DataFrame(columns=["hotspot_events", "frp_sum_mw", "confirmed_both"]).rename_axis("date")
    d = events.groupby("date").agg(
        hotspot_events=("lat", "size"),
        frp_sum_mw=("frp_mw", "sum"),
        confirmed_both=("both_modis_viirs", "sum"),
    )
    return d


def build_timeline(history: pd.DataFrame, forecast: pd.DataFrame, events: pd.DataFrame) -> pd.DataFrame:
    """One row per day: NASA POWER history + forecast + hotspot activity."""
    parts = []
    if not history.empty:
        parts.append(history.assign(is_forecast=False))
    if not forecast.empty:
        parts.append(forecast.assign(is_forecast=True))
    tl = pd.concat(parts).sort_index()
    tl = tl[~tl.index.duplicated(keep="last")]  # forecast wins on overlap
    tl = tl.join(daily_hotspots(events), how="left")
    for c in ["hotspot_events", "frp_sum_mw", "confirmed_both"]:
        tl[c] = tl[c].fillna(0)
    tl["is_forecast"] = tl["is_forecast"].astype(bool)
    return tl


def summarize(tl: pd.DataFrame, events: pd.DataFrame) -> dict:
    """Compact numeric context for Grok."""
    hist = tl[~tl["is_forecast"]]
    dry_days = 0
    for v in reversed(hist["rain_mm"].fillna(0).tolist()):
        if v < 1.0:
            dry_days += 1
        else:
            break
    recent = events
    return {
        "hotspots_last_5d": {
            "events": int(len(recent)),
            "confirmed_by_both_modis_and_viirs": int(recent["both_modis_viirs"].sum()) if len(recent) else 0,
            "total_frp_mw": round(float(recent["frp_mw"].sum()), 1) if len(recent) else 0.0,
            "max_frp_mw": round(float(recent["frp_mw"].max()), 1) if len(recent) else 0.0,
        },
        "recent_weather_nasa_power": {
            "days": int(len(hist)),
            "avg_tmax_c": _r(hist["tmax_c"].mean()) if len(hist) else None,
            "avg_humidity_pct": _r(hist["rh_mean_pct"].mean()) if "rh_mean_pct" in hist and len(hist) else None,
            "total_rain_mm": _r(hist["rain_mm"].sum()) if len(hist) else None,
            "consecutive_dry_days": dry_days,
        },
        "dry_days": dry_days,
    }


def _r(x):
    return None if pd.isna(x) else round(float(x), 1)


def records(df: pd.DataFrame) -> list[dict]:
    """DataFrame -> JSON-safe list of dicts (NaN -> None, dates -> str)."""
    out = df.copy()
    for c in out.columns:
        if pd.api.types.is_datetime64_any_dtype(out[c]):
            out[c] = out[c].dt.strftime("%Y-%m-%d" if c == "date" else "%Y-%m-%d %H:%M")
    out = out.astype(object).where(out.notna(), None)
    return out.to_dict(orient="records")
