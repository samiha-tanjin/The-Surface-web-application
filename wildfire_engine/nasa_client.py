"""Data fetchers. Each returns a pandas DataFrame and never raises on a bad source:
problems are appended to `notes` so the pipeline can still run with partial data."""
from __future__ import annotations

import datetime as dt
import io

import httpx
import numpy as np
import pandas as pd

import config

FIRMS_URL = "https://firms.modaps.eosdis.nasa.gov/api/area/csv"
POWER_URL = "https://power.larc.nasa.gov/api/temporal/daily/point"
TIMEOUT = httpx.Timeout(60.0, connect=15.0)


def fetch_firms(client: httpx.Client, lat: float, lon: float, days: int, notes: list[str]) -> tuple[pd.DataFrame, bool]:
    """NASA FIRMS active-fire detections (MODIS + VIIRS) around a point. Needs MAP_KEY.
    Returns (rows, ok). ok=False means FIRMS could not be reached/read, so 0 rows does NOT mean 0 fires."""
    if not config.FIRMS_MAP_KEY:
        notes.append("FIRMS_MAP_KEY missing: no hotspot data")
        return pd.DataFrame(), False
    d = config.BBOX_DEG
    bbox = f"{lon - d:.4f},{lat - d:.4f},{lon + d:.4f},{lat + d:.4f}"  # west,south,east,north
    days = min(max(int(days), 1), 5)  # FIRMS area API allows 1-5 days per call
    frames, ok = [], False
    for source in config.FIRMS_SOURCES:
        url = f"{FIRMS_URL}/{config.FIRMS_MAP_KEY}/{source}/{bbox}/{days}"
        df, timed_out = None, False
        for attempt in (1, 2):
            try:
                r = client.get(url, timeout=TIMEOUT)
                r.raise_for_status()
                df = pd.read_csv(io.StringIO(r.text), dtype={"confidence": str, "acq_time": str})
                break
            except httpx.TimeoutException as e:
                if attempt == 2:
                    timed_out = True
                    notes.append(f"FIRMS {source} failed: {type(e).__name__} (cannot reach firms.modaps.eosdis.nasa.gov)")
            except Exception as e:  # bad key, HTTP error, empty body...
                notes.append(f"FIRMS {source} failed: {type(e).__name__}")
                break
        if timed_out:
            notes.append("FIRMS unreachable: skipped remaining sources")
            break  # if the host is unreachable, the other sources will be too
        if df is None:
            continue
        if "latitude" not in df.columns:
            notes.append(f"FIRMS {source}: unexpected response (check MAP_KEY / source availability)")
            continue
        ok = True  # got a valid FIRMS table (it may legitimately have zero rows)
        if not df.empty:
            df["source"] = source
            frames.append(df)
    return (pd.concat(frames, ignore_index=True) if frames else pd.DataFrame()), ok


def fetch_power(client: httpx.Client, lat: float, lon: float, days: int, notes: list[str]) -> pd.DataFrame:
    """NASA POWER daily history (temperature, humidity, rain, wind). No key. Lags a few days."""
    end = dt.date.today() - dt.timedelta(days=1)
    start = end - dt.timedelta(days=days - 1)
    params = {
        "parameters": "T2M_MAX,RH2M,PRECTOTCORR,WS2M",
        "community": "AG",
        "longitude": lon,
        "latitude": lat,
        "start": start.strftime("%Y%m%d"),
        "end": end.strftime("%Y%m%d"),
        "format": "JSON",
    }
    try:
        r = client.get(POWER_URL, params=params, timeout=TIMEOUT)
        r.raise_for_status()
        p = r.json()["properties"]["parameter"]
        df = pd.DataFrame(p)
        df.index = pd.to_datetime(df.index, format="%Y%m%d")
        df.index.name = "date"
        df = df.replace(-999, np.nan).rename(
            columns={"T2M_MAX": "tmax_c", "RH2M": "rh_mean_pct", "PRECTOTCORR": "rain_mm", "WS2M": "wind_kmh"}
        )
        df["wind_kmh"] = df["wind_kmh"] * 3.6  # m/s -> km/h
        return df.dropna(how="all")
    except Exception as e:
        notes.append(f"NASA POWER failed: {type(e).__name__}")
        return pd.DataFrame()


def fetch_forecast(client: httpx.Client, lat: float, lon: float, days: int, notes: list[str]) -> pd.DataFrame:
    """Open-Meteo daily forecast (POWER has no forecast). No key."""
    params = {
        "latitude": lat,
        "longitude": lon,
        "daily": "temperature_2m_max,relative_humidity_2m_min,precipitation_sum,wind_speed_10m_max",
        "forecast_days": days,
        "timezone": "auto",
    }
    try:
        r = client.get(config.FORECAST_API_URL, params=params, timeout=TIMEOUT)
        r.raise_for_status()
        d = r.json()["daily"]
        df = pd.DataFrame(
            {
                "tmax_c": d["temperature_2m_max"],
                "rh_min_pct": d["relative_humidity_2m_min"],
                "rain_mm": d["precipitation_sum"],
                "wind_kmh": d["wind_speed_10m_max"],
            },
            index=pd.to_datetime(d["time"]),
        )
        df.index.name = "date"
        return df
    except Exception as e:
        notes.append(f"Open-Meteo forecast failed: {type(e).__name__}")
        return pd.DataFrame()