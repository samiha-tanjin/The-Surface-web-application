// Types for satellite active-fire observations shown in the hotspot map.
//
// Scientific note: MODIS and VIIRS are different instruments (1 km and
// 375 m pixels, different brightness channels, different confidence
// scales). Every record keeps its original satellite, instrument and
// original values. The frontend never merges or removes observations;
// harmonization is the backend's job.

export type Satellite = "MODIS" | "VIIRS"

export type SatelliteFilter = "ALL" | Satellite

// MODIS reports confidence as a percentage (0-100).
// VIIRS reports confidence as a class: low, nominal or high.
// Both are kept exactly as the source provided them.
export type Confidence =
  | { kind: "percent"; value: number }
  | { kind: "class"; value: "low" | "nominal" | "high" }

// A coarse grouping used only by the confidence filter.
// It is a display grouping, not a harmonized scientific value.
export type ConfidenceLevel = "low" | "nominal" | "high"

export type HotspotObservation = {
  observation_id: string
  latitude: number
  longitude: number
  acquisition_date: string // YYYY-MM-DD, UTC
  acquisition_time: string | null // HHMM, UTC, or null if unavailable
  satellite: Satellite // instrument family: MODIS or VIIRS
  instrument: string | null // instrument name exactly as the source gave it
  platform: string | null // satellite code exactly as the source gave it
  brightness_temperature: number | null // kelvin, null if unavailable
  brightness_band: string | null // which channel the value comes from
  confidence: Confidence | null
  frp: number | null // fire radiative power in MW, null if unavailable
  daynight: "day" | "night" | null
  source: string // product the record came from, e.g. VIIRS_NOAA20_NRT
  location_name: string | null // place name, null if unavailable
  is_demo: boolean // true for demonstration data
}

export type DataStatus = "connecting" | "loading" | "loaded" | "empty" | "failed"

export type HotspotDataset = {
  observations: HotspotObservation[]
  last_updated: string | null // ISO timestamp of the fetch, null if unknown
  is_demo: boolean
}

export type HotspotFilters = {
  satellite: SatelliteFilter
  dateFrom: string // YYYY-MM-DD or empty
  dateTo: string // YYYY-MM-DD or empty
  confidence: "ALL" | ConfidenceLevel
  region: string // region id, "world" for no regional limit
}

export type MapRegion = {
  id: string
  label: string
  // [south, west, north, east]
  bounds: [number, number, number, number]
}