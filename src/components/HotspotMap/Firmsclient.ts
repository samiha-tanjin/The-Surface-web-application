import type {
  Confidence,
  HotspotDataset,
  HotspotObservation,
  MapRegion,
  Satellite,
} from "./types"

// The browser never sees the FIRMS MAP_KEY. It calls this address, and a
// server-side proxy (see vite.config.ts) adds the key before forwarding the
// request to NASA. To use a real backend later, set VITE_HOTSPOT_API_BASE.
export const API_BASE: string =
  (import.meta.env.VITE_HOTSPOT_API_BASE as string | undefined) || "/firms-api"

export type FirmsSource = { id: string; satellite: Satellite; label: string }

// Suomi NPP VIIRS stopped delivering data on 2 November 2026, so it is not
// requested. NOAA-20 and NOAA-21 are the VIIRS sources that continue.
export const SOURCES: FirmsSource[] = [
  { id: "MODIS_NRT", satellite: "MODIS", label: "MODIS (Terra and Aqua)" },
  { id: "VIIRS_NOAA20_NRT", satellite: "VIIRS", label: "VIIRS NOAA-20" },
  { id: "VIIRS_NOAA21_NRT", satellite: "VIIRS", label: "VIIRS NOAA-21" },
]

function toNumber(value: string | undefined): number | null {
  if (value === undefined || value.trim() === "") return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function parseConfidence(raw: string | undefined): Confidence | null {
  const v = (raw ?? "").trim().toLowerCase()
  if (!v) return null
  if (v === "l" || v === "low") return { kind: "class", value: "low" }
  if (v === "n" || v === "nominal") return { kind: "class", value: "nominal" }
  if (v === "h" || v === "high") return { kind: "class", value: "high" }
  const n = Number(v)
  return Number.isFinite(n) ? { kind: "percent", value: n } : null
}

function parseCsv(text: string, source: FirmsSource): HotspotObservation[] {
  const lines = text.trim().split(/\r?\n/)
  const header = (lines[0] ?? "").split(",").map((h) => h.trim())
  const col = (name: string) => header.indexOf(name)
  const iLat = col("latitude")
  const iLon = col("longitude")

  if (iLat < 0 || iLon < 0) {
    const sample = text.trim().slice(0, 80)
    throw new Error(
      sample.startsWith("<")
        ? `${source.label}: the address returned a web page instead of data. Is the proxy running?`
        : `${source.label}: unexpected response "${sample}"`,
    )
  }

  const isModis = source.satellite === "MODIS"
  const iBright = col(isModis ? "brightness" : "bright_ti4")
  const iDate = col("acq_date")
  const iTime = col("acq_time")
  const iSat = col("satellite")
  const iInst = col("instrument")
  const iConf = col("confidence")
  const iFrp = col("frp")
  const iDn = col("daynight")
  const band = isModis ? "MODIS channel 21/22" : "VIIRS I-4"

  const out: HotspotObservation[] = []
  for (let i = 1; i < lines.length; i++) {
    const c = (lines[i] ?? "").split(",")
    const latitude = Number(c[iLat])
    const longitude = Number(c[iLon])
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue

    const date = (c[iDate] ?? "").trim()
    const rawTime = (c[iTime] ?? "").trim()
    const time = rawTime ? rawTime.padStart(4, "0") : null
    const dn = (c[iDn] ?? "").trim().toUpperCase()

    out.push({
      observation_id: `${source.id}:${date}:${time ?? ""}:${latitude}:${longitude}`,
      latitude,
      longitude,
      acquisition_date: date,
      acquisition_time: time,
      satellite: source.satellite,
      instrument: (c[iInst] ?? "").trim() || null,
      platform: (c[iSat] ?? "").trim() || null,
      brightness_temperature: toNumber(c[iBright]),
      brightness_band: band,
      confidence: parseConfidence(c[iConf]),
      frp: toNumber(c[iFrp]),
      daynight: dn === "D" ? "day" : dn === "N" ? "night" : null,
      source: source.id,
      location_name: null, // FIRMS does not provide place names
      is_demo: false,
    })
  }
  return out
}

// Fetches the three sources in parallel. If some fail, the others are still
// returned and the failures are listed so the interface can say so.
export async function fetchObservations(
  region: MapRegion,
  days: number,
  signal: AbortSignal,
  onResponse: () => void,
): Promise<{ dataset: HotspotDataset; failed: string[] }> {
  const [s, w, n, e] = region.bounds
  const area = region.id === "world" ? "world" : `${w},${s},${e},${n}`

  const results = await Promise.allSettled(
    SOURCES.map(async (src) => {
      const res = await fetch(`${API_BASE}/area/${src.id}/${area}/${days}`, { signal })
      if (!res.ok) throw new Error(`${src.label}: HTTP ${res.status}`)
      onResponse()
      return parseCsv(await res.text(), src)
    }),
  )

  const observations: HotspotObservation[] = []
  const failed: string[] = []
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      for (const o of r.value) observations.push(o)
    } else {
      failed.push(r.reason instanceof Error ? r.reason.message : `${SOURCES[i]?.label ?? "Source"} failed`)
    }
  })

  if (failed.length === SOURCES.length) throw new Error(failed.join(" | "))

  return {
    dataset: { observations, last_updated: new Date().toISOString(), is_demo: false },
    failed,
  }
}