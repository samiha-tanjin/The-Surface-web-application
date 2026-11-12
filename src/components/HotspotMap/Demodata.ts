import type { HotspotDataset, HotspotObservation } from "./types"

// DEMONSTRATION DATA ONLY.
// These points are invented for layout testing. They are not satellite
// detections. Dates are deliberately set to the year 2000 so they cannot be
// mistaken for current observations.

const base = {
  brightness_band: null,
  daynight: null,
  location_name: null,
  is_demo: true,
  source: "DEMO",
} as const

const viirs = (id: string, lat: number, lon: number, conf: "low" | "nominal" | "high", frp: number | null, bt: number | null): HotspotObservation => ({
  ...base,
  observation_id: `demo-${id}`,
  latitude: lat,
  longitude: lon,
  acquisition_date: "2000-01-01",
  acquisition_time: "0130",
  satellite: "VIIRS",
  instrument: "VIIRS",
  platform: "demo",
  brightness_temperature: bt,
  confidence: { kind: "class", value: conf },
  frp,
})

const modis = (id: string, lat: number, lon: number, pct: number | null, frp: number | null, bt: number | null): HotspotObservation => ({
  ...base,
  observation_id: `demo-${id}`,
  latitude: lat,
  longitude: lon,
  acquisition_date: "2000-01-02",
  acquisition_time: "1015",
  satellite: "MODIS",
  instrument: "MODIS",
  platform: "demo",
  brightness_temperature: bt,
  confidence: pct === null ? null : { kind: "percent", value: pct },
  frp,
})

export const DEMO_DATASET: HotspotDataset = {
  is_demo: true,
  last_updated: null,
  observations: [
    viirs("1", -9.5, -62.0, "high", 41.2, 345.1),
    viirs("2", -8.0, 24.0, "nominal", 12.5, 331.7),
    viirs("3", -14.0, 132.0, "low", null, null),
    viirs("4", 58.0, 100.0, "nominal", 8.9, 329.4),
    viirs("5", 40.5, -120.5, "high", 77.0, 358.2),
    viirs("6", 21.0, 80.0, "nominal", 5.4, 322.6),
    modis("7", -2.5, 103.0, 85, 30.1, 338.9),
    modis("8", 40.2, -8.0, 45, 14.3, 326.0),
    modis("9", -2.0, 114.0, 20, null, null),
    modis("10", 7.0, 21.0, null, 9.8, 330.2),
  ],
}