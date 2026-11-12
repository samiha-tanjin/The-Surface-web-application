import type {
  Confidence,
  ConfidenceLevel,
  HotspotFilters,
  HotspotObservation,
  MapRegion,
} from "./types"

// Rough rectangles for convenience: [south, west, north, east].
export const REGIONS: MapRegion[] = [
  { id: "world", label: "World", bounds: [-90, -180, 90, 180] },
  { id: "north-america", label: "North America", bounds: [7, -170, 75, -50] },
  { id: "south-america", label: "South America", bounds: [-56, -82, 13, -34] },
  { id: "europe", label: "Europe", bounds: [35, -25, 72, 45] },
  { id: "africa", label: "Africa", bounds: [-35, -20, 38, 52] },
  { id: "south-asia", label: "South Asia", bounds: [5, 60, 37, 98] },
  { id: "southeast-asia", label: "Southeast Asia", bounds: [-11, 92, 29, 141] },
  { id: "north-east-asia", label: "North and East Asia", bounds: [20, 60, 78, 180] },
  { id: "oceania", label: "Australia and Oceania", bounds: [-48, 110, 0, 180] },
]

export const DEFAULT_FILTERS: HotspotFilters = {
  satellite: "ALL",
  dateFrom: "",
  dateTo: "",
  confidence: "ALL",
  region: "world",
}

// Drawing tens of thousands of markers freezes a browser, so the map draws
// at most this many at once. The summary always shows the true counts.
export const MAX_DRAWN = 12000

export const MARKER_COLORS = { VIIRS: "#ff6e5b", MODIS: "#101a4d" } as const

// Display grouping for the confidence filter only.
// VIIRS keeps its own class. MODIS percentages are grouped below 30,
// 30 to 79 and 80 or more. These MODIS cut-offs come from secondary
// literature, not from the FIRMS page, so treat them as a convenience.
export function confidenceLevel(c: Confidence | null): ConfidenceLevel | null {
  if (!c) return null
  if (c.kind === "class") return c.value
  if (c.value >= 80) return "high"
  if (c.value >= 30) return "nominal"
  return "low"
}

export function matchesFilters(o: HotspotObservation, f: HotspotFilters): boolean {
  if (f.satellite !== "ALL" && o.satellite !== f.satellite) return false
  if (f.dateFrom && o.acquisition_date < f.dateFrom) return false
  if (f.dateTo && o.acquisition_date > f.dateTo) return false
  if (f.confidence !== "ALL" && confidenceLevel(o.confidence) !== f.confidence) return false
  return true
}

export function formatTime(time: string | null): string | null {
  if (!time) return null
  const t = time.padStart(4, "0")
  return `${t.slice(0, 2)}:${t.slice(2, 4)}`
}

export function formatAcquired(date: string, time: string | null): string {
  const t = formatTime(time)
  return t ? `${date} ${t} UTC` : `${date} (time not available)`
}

export function formatConfidence(c: Confidence | null): string {
  if (!c) return "Not available"
  if (c.kind === "percent") return `${c.value}% (MODIS percent scale)`
  return `${c.value.charAt(0).toUpperCase()}${c.value.slice(1)} (VIIRS class)`
}