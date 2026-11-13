"""Central settings, read from environment / .env."""
import os

from dotenv import load_dotenv

load_dotenv()


def _env(*names: str, default: str = "") -> str:
    """First non-empty env var among `names`; ignores '...' and 'your_*' placeholders."""
    for n in names:
        v = os.getenv(n, "").strip()
        if v and v != "..." and not v.lower().startswith("your_"):
            return v
    return default


FIRMS_MAP_KEY = _env("NASA_FIRMS_MAP_KEY", "FIRMS_MAP_KEY", "MAP_KEY")
EARTHDATA_TOKEN = _env("EARTH_DATA_TOKEN", "EARTHDATA_TOKEN")  # reserved for extra NASA datasets (not used yet)
XAI_API_KEY = _env("XAI_API_KEY")
GROK_MODEL = _env("XAI_MODEL", "GROK_MODEL", default="grok-4.5")
FORECAST_API_URL = _env("FORECAST_API_URL", default="https://api.open-meteo.com/v1/forecast")  # engine-only; WEATHER_API_BASE_URL is left to existing code

# FIRMS sources to merge (MODIS + VIIRS). If one returns nothing, the others still work.
FIRMS_SOURCES = [
    s.strip()
    for s in os.getenv("FIRMS_SOURCES", "VIIRS_NOAA20_NRT,VIIRS_NOAA21_NRT,MODIS_NRT").split(",")
    if s.strip()
]
BBOX_DEG = float(os.getenv("BBOX_DEG", "0.5"))  # half-width of search box in degrees (~55 km)
CACHE_TTL = int(os.getenv("CACHE_TTL_SECONDS", "21600"))  # 6 h
FRONTEND_ORIGINS = [
    o.strip()
    for o in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
    if o.strip()
]

HISTORY_DAYS = 14   # NASA POWER look-back
FORECAST_DAYS = 7   # days of risk to produce
MIN_CONFIDENCE = 30  # normalized 0-100; drops low-confidence detections