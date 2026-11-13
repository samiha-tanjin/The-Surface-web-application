"""FastAPI app. Routes live under /engine so existing /api routes are untouched.
Run:  uvicorn main:app --reload --port 8000"""
import time

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

import config
import engine

app = FastAPI(title="The Surface - Wildfire Prediction Engine")
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.FRONTEND_ORIGINS,
    allow_methods=["GET"],
    allow_headers=["*"],
)

_cache: dict[tuple, tuple[float, dict]] = {}


def _cached(key: tuple, fn, cache_ok=lambda d: True):
    hit = _cache.get(key)
    if hit and time.time() - hit[0] < config.CACHE_TTL:
        return hit[1]
    data = fn()
    if cache_ok(data):  # don't keep results that were built from a failed NASA fetch
        _cache[key] = (time.time(), data)
    return data


@app.get("/engine/health")
def health():
    return {
        "ok": True,
        "firms_key": bool(config.FIRMS_MAP_KEY),
        "earthdata_token": bool(config.EARTHDATA_TOKEN),
        "xai_key": bool(config.XAI_API_KEY),
        "model": config.GROK_MODEL,
    }


@app.get("/engine/prediction")
def prediction(lat: float = Query(..., ge=-90, le=90), lon: float = Query(..., ge=-180, le=180)):
    try:
        return _cached(("pred", round(lat, 1), round(lon, 1)), lambda: engine.run_prediction(lat, lon), lambda d: d["hotspots_available"])
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))


@app.get("/engine/hotspots")
def hotspots(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
    days: int = Query(5, ge=1, le=5),
):
    try:
        return _cached(("hot", round(lat, 1), round(lon, 1), days), lambda: engine.run_hotspots(lat, lon, days), lambda d: d["available"])
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))