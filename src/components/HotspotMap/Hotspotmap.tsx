import { useEffect, useMemo, useRef, useState } from "react"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import "./HotspotMap.css"
import type {
  DataStatus,
  HotspotDataset,
  HotspotFilters,
  HotspotObservation,
} from "./types"
import {
  DEFAULT_FILTERS,
  MARKER_COLORS,
  MAX_DRAWN,
  REGIONS,
  formatAcquired,
  formatConfidence,
  matchesFilters,
} from "./helpers"
import { fetchObservations } from "./firmsClient"
import { DEMO_DATASET } from "./demoData"

const STATUS_TEXT: Record<DataStatus, string> = {
  connecting: "Connecting to the NASA FIRMS data service…",
  loading: "Loading observations…",
  loaded: "Observations loaded.",
  empty: "No observations were returned for this region and period.",
  failed: "Could not load observations.",
}

function formatStamp(iso: string | null): string {
  if (!iso) return "Not available"
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? "Not available" : d.toLocaleString()
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="hm-row">
      <dt>{label}</dt>
      <dd>{value ?? "Not available"}</dd>
    </div>
  )
}

export default function HotspotMap() {
  const mapEl = useRef<HTMLDivElement>(null)
  const readoutEl = useRef<HTMLSpanElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)

  const [filters, setFilters] = useState<HotspotFilters>(DEFAULT_FILTERS)
  const [days, setDays] = useState(1)
  const [demo, setDemo] = useState(false)
  const [status, setStatus] = useState<DataStatus>("connecting")
  const [dataset, setDataset] = useState<HotspotDataset | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])
  const [lastSuccess, setLastSuccess] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selected, setSelected] = useState<HotspotObservation | null>(null)
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null)

  const region = REGIONS.find((r) => r.id === filters.region) ?? REGIONS[0]!

  // Create the map once.
  useEffect(() => {
    if (!mapEl.current) return
    const map = L.map(mapEl.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxBounds: [[-90, -180], [90, 180]],
      maxBoundsViscosity: 1,
      preferCanvas: true,
    })
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      noWrap: true,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
    const layer = L.layerGroup().addTo(map)
    map.on("moveend", () => setBounds(map.getBounds()))
    map.on("mousemove", (e: L.LeafletMouseEvent) => {
      if (readoutEl.current) {
        readoutEl.current.textContent = `${e.latlng.lat.toFixed(3)}°, ${e.latlng.lng.toFixed(3)}°`
      }
    })
    map.on("mouseout", () => {
      if (readoutEl.current) readoutEl.current.textContent = "Move the pointer over the map"
    })
    setBounds(map.getBounds())
    mapRef.current = map
    layerRef.current = layer
    return () => {
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  // Load data when the region, day range, mode or retry counter changes.
  useEffect(() => {
    setSelected(null)
    setError(null)
    setWarnings([])
    if (demo) {
      setDataset(DEMO_DATASET)
      setStatus("loaded")
      return
    }
    const controller = new AbortController()
    setDataset(null)
    setStatus("connecting")
    fetchObservations(region, days, controller.signal, () => {
      if (!controller.signal.aborted) setStatus("loading")
    })
      .then(({ dataset: ds, failed }) => {
        if (controller.signal.aborted) return
        setDataset(ds)
        setWarnings(failed)
        setLastSuccess(ds.last_updated)
        setStatus(ds.observations.length === 0 ? "empty" : "loaded")
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : "Unknown error")
        setStatus("failed")
      })
    return () => controller.abort()
  }, [region, days, demo, reloadKey])

  // Move the map when the region changes.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    if (region.id === "world") {
      map.setView([20, 0], 2)
    } else {
      const [s, w, n, e] = region.bounds
      map.fitBounds([[s, w], [n, e]])
    }
  }, [region])

  const filtered = useMemo(
    () => (dataset?.observations ?? []).filter((o) => matchesFilters(o, filters)),
    [dataset, filters],
  )

  const stats = useMemo(() => {
    let modis = 0
    let viirs = 0
    let newest = ""
    for (const o of dataset?.observations ?? []) {
      if (o.satellite === "MODIS") modis++
      else viirs++
      const stamp = `${o.acquisition_date} ${(o.acquisition_time ?? "0000").padStart(4, "0")}`
      if (stamp > newest) newest = stamp
    }
    const newestText = newest
      ? `${newest.slice(0, 10)} ${newest.slice(11, 13)}:${newest.slice(13, 15)} UTC`
      : "Not available"
    return { modis, viirs, newestText }
  }, [dataset])

  // Only detections inside the current view are drawn, thinned evenly if
  // there are too many. Nothing is removed from the dataset itself.
  const { drawn, inView } = useMemo(() => {
    const view = bounds ? bounds.pad(0.1) : null
    const list = view ? filtered.filter((o) => view.contains([o.latitude, o.longitude])) : filtered
    if (list.length <= MAX_DRAWN) return { drawn: list, inView: list.length }
    const step = list.length / MAX_DRAWN
    const out: HotspotObservation[] = []
    for (let i = 0; i < MAX_DRAWN; i++) {
      const item = list[Math.floor(i * step)]
      if (item) out.push(item)
    }
    return { drawn: out, inView: list.length }
  }, [filtered, bounds])

  // Draw markers.
  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    layer.clearLayers()
    for (const o of drawn) {
      L.circleMarker([o.latitude, o.longitude], {
        radius: 4,
        weight: 1,
        color: "#ffffff",
        fillColor: MARKER_COLORS[o.satellite],
        fillOpacity: 0.85,
        bubblingMouseEvents: false,
      })
        .on("click", () => setSelected(o))
        .addTo(layer)
    }
  }, [drawn])

  // Ring around the selected detection.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selected) return
    const ring = L.circleMarker([selected.latitude, selected.longitude], {
      radius: 10,
      weight: 2,
      color: "#101a4d",
      fill: false,
      interactive: false,
    }).addTo(map)
    return () => {
      ring.remove()
    }
  }, [selected])

  const update = (patch: Partial<HotspotFilters>) => setFilters((f) => ({ ...f, ...patch }))
  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS)
    setDays(1)
  }

  const total = dataset ? dataset.observations.length : null
  const busy = status === "connecting" || status === "loading"

  return (
    <div className="hm">
      <div className={`hm-status hm-status-${demo ? "demo" : status}`} role="status">
        <span className="hm-dot" aria-hidden="true" />
        <span className="hm-status-text">
          {demo
            ? "Demonstration data: invented points for layout testing, not real detections."
            : STATUS_TEXT[status]}
          {!demo && status === "failed" && error ? ` ${error}` : ""}
          {!demo && lastSuccess && status !== "loaded" && status !== "empty"
            ? ` Last successful update: ${formatStamp(lastSuccess)}.`
            : ""}
        </span>
        <span className="hm-badge">{demo ? "Demonstration data" : "NASA FIRMS · near real-time"}</span>
        {demo && (
          <button type="button" className="hm-link" onClick={() => setDemo(false)}>
            Back to FIRMS data
          </button>
        )}
      </div>

      {warnings.length > 0 && (
        <p className="hm-warning">Some sources did not respond and are missing: {warnings.join(" | ")}</p>
      )}

      <dl className="hm-summary">
        <div><dt>Detections loaded</dt><dd>{total ?? "—"}</dd></div>
        <div><dt>MODIS</dt><dd>{total === null ? "—" : stats.modis}</dd></div>
        <div><dt>VIIRS</dt><dd>{total === null ? "—" : stats.viirs}</dd></div>
        <div><dt>Shown after filters</dt><dd>{total === null ? "—" : filtered.length}</dd></div>
        <div><dt>Newest detection</dt><dd>{total === null ? "—" : stats.newestText}</dd></div>
        <div>
          <dt>Last fetched</dt>
          <dd>{demo ? "Not applicable" : formatStamp(lastSuccess)}</dd>
        </div>
        <div><dt>Region</dt><dd>{region.label}</dd></div>
      </dl>

      <form className="hm-filters" onSubmit={(e) => e.preventDefault()}>
        <label>
          Region
          <select value={filters.region} onChange={(e) => update({ region: e.target.value })}>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </label>
        <label>
          Days to load
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} disabled={demo}>
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
        <label>
          Satellite
          <select
            value={filters.satellite}
            onChange={(e) => update({ satellite: e.target.value as HotspotFilters["satellite"] })}
          >
            <option value="ALL">All</option>
            <option value="MODIS">MODIS</option>
            <option value="VIIRS">VIIRS</option>
          </select>
        </label>
        <label>
          From
          <input type="date" value={filters.dateFrom} onChange={(e) => update({ dateFrom: e.target.value })} />
        </label>
        <label>
          To
          <input type="date" value={filters.dateTo} onChange={(e) => update({ dateTo: e.target.value })} />
        </label>
        <label>
          Confidence
          <select
            value={filters.confidence}
            onChange={(e) => update({ confidence: e.target.value as HotspotFilters["confidence"] })}
          >
            <option value="ALL">All</option>
            <option value="low">Low</option>
            <option value="nominal">Nominal</option>
            <option value="high">High</option>
          </select>
        </label>
        <button type="button" className="hm-clear" onClick={clearFilters}>
          Clear filters
        </button>
      </form>

      <div className="hm-body">
        <div className="hm-mapwrap">
          <div ref={mapEl} className="hm-map" aria-label="Interactive map of satellite thermal detections" />

          <div className="hm-legend">
            <strong>Satellite thermal detections</strong>
            <span><i style={{ background: MARKER_COLORS.VIIRS }} /> VIIRS (375 m pixels)</span>
            <span><i style={{ background: MARKER_COLORS.MODIS }} /> MODIS (1 km pixels)</span>
            <span><i className="hm-ring" /> Selected detection</span>
            <small>A detection is not a confirmed wildfire.</small>
          </div>

          <div className="hm-readout">
            <span ref={readoutEl}>Move the pointer over the map</span>
          </div>

          {total !== null && inView > MAX_DRAWN && (
            <div className="hm-cap">
              Showing {MAX_DRAWN} of {inView} detections in view, spread evenly. Zoom in to see every one.
            </div>
          )}

          {busy && <div className="hm-overlay"><p>{STATUS_TEXT[status]}</p></div>}

          {status === "empty" && !demo && (
            <div className="hm-overlay"><p>{STATUS_TEXT.empty}</p></div>
          )}

          {status === "failed" && !demo && (
            <div className="hm-overlay hm-overlay-actions">
              <p>{STATUS_TEXT.failed}</p>
              {error && <p className="hm-error">{error}</p>}
              <div>
                <button type="button" onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
                <button type="button" className="hm-secondary" onClick={() => setDemo(true)}>
                  Show demonstration data
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="hm-info" aria-live="polite">
          <h3>Detection details</h3>
          {selected ? (
            <>
              {selected.is_demo && <p className="hm-demo-tag">Demonstration data. Not a real detection.</p>}
              <dl>
                <Row label="Satellite" value={selected.satellite} />
                <Row label="Instrument" value={selected.instrument} />
                <Row label="Platform code" value={selected.platform} />
                <Row label="Source product" value={selected.source} />
                <Row label="Latitude" value={selected.latitude.toFixed(5)} />
                <Row label="Longitude" value={selected.longitude.toFixed(5)} />
                <Row label="Acquired" value={formatAcquired(selected.acquisition_date, selected.acquisition_time)} />
                <Row label="Day or night" value={selected.daynight} />
                <Row
                  label={`Brightness temperature${selected.brightness_band ? ` (${selected.brightness_band})` : ""}`}
                  value={selected.brightness_temperature === null ? null : `${selected.brightness_temperature} K`}
                />
                <Row label="Confidence" value={formatConfidence(selected.confidence)} />
                <Row label="Fire radiative power" value={selected.frp === null ? null : `${selected.frp} MW`} />
                <Row label="Place name" value={selected.location_name} />
              </dl>
              <button type="button" className="hm-link" onClick={() => setSelected(null)}>
                Clear selection
              </button>
            </>
          ) : (
            <p className="hm-hint">Select a marker on the map to see its details.</p>
          )}
        </aside>
      </div>

      <p className="hm-note">
        Each marker is one satellite detection of a thermal anomaly. It is not a confirmed wildfire, because other hot
        surfaces can also trigger detections. MODIS and VIIRS are different instruments with different pixel sizes and
        confidence scales, so their observations are shown separately and are not merged or de-duplicated here.
        Suomi NPP VIIRS stopped delivering data on 2 November 2026, so VIIRS here comes from NOAA-20 and NOAA-21.
      </p>
    </div>
  )
}