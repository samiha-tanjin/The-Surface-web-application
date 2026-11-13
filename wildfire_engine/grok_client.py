"""Grok (xAI) reads the merged data and returns a structured risk estimate per day."""
from __future__ import annotations

import json

import httpx

import config

XAI_URL = "https://api.x.ai/v1/chat/completions"

SYSTEM = (
    "You are a wildfire risk analyst. Use ONLY the JSON data provided; do not invent observations. "
    "Hotspots come from NASA FIRMS (MODIS and VIIRS, harmonized). Weather history is NASA POWER; "
    "forecast is Open-Meteo. Each forecast day includes a transparent `baseline_score` (0-100); "
    "refine it using the data and stay within 25 points of it unless the data clearly justify more. "
    "Hot, dry, windy, rain-free days after a long dry spell with active nearby hotspots mean higher risk. "
    'Reply with JSON only, no markdown: {"days":[{"date":"YYYY-MM-DD","score":0-100,'
    '"reason":"max 18 words"}]} with exactly one entry per forecast day.'
)


def predict(client: httpx.Client, context: dict) -> list[dict]:
    if not config.XAI_API_KEY:
        raise RuntimeError("XAI_API_KEY missing")
    r = client.post(
        XAI_URL,
        headers={"Authorization": f"Bearer {config.XAI_API_KEY}", "Content-Type": "application/json"},
        json={
            "model": config.GROK_MODEL,
            "temperature": 0.2,
            "messages": [
                {"role": "system", "content": SYSTEM},
                {"role": "user", "content": json.dumps(context)},
            ],
        },
        timeout=90,
    )
    r.raise_for_status()
    text = r.json()["choices"][0]["message"]["content"]
    start, end = text.find("{"), text.rfind("}")  # tolerate stray prose / code fences
    if start < 0 or end < 0:
        raise ValueError("Grok returned no JSON")
    days = json.loads(text[start : end + 1]).get("days")
    if not isinstance(days, list):
        raise ValueError("Grok JSON missing 'days'")
    return days
