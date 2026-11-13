"""MongoDB sink for the wildfire engine. Same schema/dedupe key as scripts/seed.ts.

Usage (from engine.py / main.py, after harmonize):
    from mongo_store import save_hotspots, rebuild_calendar
    save_hotspots(records)   # records: list of dicts
    rebuild_calendar()

Each record needs: lat, lon, frp, acq_date ('YYYY-MM-DD'), source ('MODIS'|'VIIRS').
Optional: confidence, region.  (Rename keys in `_norm` if harmonize.py uses others.)
"""
import os
from datetime import datetime, timezone
from pymongo import MongoClient, UpdateOne

_client = None
def db():
    global _client
    if _client is None:
        _client = MongoClient(os.environ["MONGODB_URI"])
    return _client[os.environ.get("MONGODB_DB", "surface")]

def _norm(r):
    src = str(r.get("source") or r.get("satellite") or "").upper()
    src = "VIIRS" if "VIIRS" in src or src in ("N", "N20", "N21") else "MODIS"
    lat, lon, day = round(float(r["lat"]), 4), round(float(r["lon"]), 4), str(r["acq_date"])[:10]
    return src, lat, lon, day

def save_hotspots(records):
    """Upsert: same day + ~1 km cell => one document; sensors accumulate in `sources`, FRP keeps the max."""
    ops = []
    for r in records:
        src, lat, lon, day = _norm(r)
        key = f"{day}_{round(lat / .01)}_{round(lon / .01)}"
        ops.append(UpdateOne({"dedupeKey": key}, {
            "$setOnInsert": {"dedupeKey": key, "lat": lat, "lon": lon,
                             "geo": {"type": "Point", "coordinates": [lon, lat]},
                             "acqDate": datetime.fromisoformat(day).replace(tzinfo=timezone.utc),
                             "confidence": r.get("confidence"), "region": r.get("region")},
            "$addToSet": {"sources": src},
            "$max": {"frp": float(r.get("frp") or 0)}}, upsert=True))
    n_raw = len(ops)
    if ops:
        for i in range(0, len(ops), 1000):
            db().hotspots.bulk_write(ops[i:i + 1000], ordered=False)
    uniq = db().hotspots.estimated_document_count()
    db().merge_runs.insert_one({"at": datetime.now(timezone.utc), "mode": "nasa", "rawDetections": n_raw, "uniqueHotspots": uniq})
    return n_raw

def rebuild_calendar():
    db().hotspots.aggregate([
        {"$group": {"_id": {"d": {"$dateToString": {"format": "%Y-%m-%d", "date": "$acqDate"}}, "r": {"$ifNull": ["$region", "Unknown"]}},
                    "n": {"$sum": 1}, "maxFrp": {"$max": "$frp"}}},
        {"$group": {"_id": "$_id.d", "count": {"$sum": "$n"}, "maxFrp": {"$max": "$maxFrp"},
                    "regions": {"$push": {"k": "$_id.r", "v": "$n"}}}},
        {"$project": {"_id": 0, "date": "$_id", "count": 1, "maxFrp": 1, "regions": {"$arrayToObject": "$regions"}}},
        {"$merge": {"into": "fire_days", "on": "date", "whenMatched": "replace", "whenNotMatched": "insert"}}])