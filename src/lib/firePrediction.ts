import { useEffect, useState } from 'react'

export type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme'

export interface FireRisk {
  date: string // 'YYYY-MM-DD'
  score: number // 0-100
  level: RiskLevel
  reason: string
}

interface EngineResponse {
  source: string
  hotspots_available: boolean
  days: FireRisk[]
  notes?: string[]
}

export interface FirePrediction {
  loading: boolean
  error: string | null
  source: string | null
  hotspotsAvailable: boolean
  byDate: Record<string, FireRisk>
  notes: string[]
}

const EMPTY: FirePrediction = {
  loading: false,
  error: null,
  source: null,
  hotspotsAvailable: true,
  byDate: {},
  notes: [],
}

/** Local-date key 'YYYY-MM-DD' (avoids toISOString, which shifts the day to UTC). */
export function toDateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** Fetches the 7-day wildfire risk from the Python engine (proxied at /engine). */
export function useFirePrediction(lat?: number, lon?: number): FirePrediction {
  const [state, setState] = useState<FirePrediction>(EMPTY)

  useEffect(() => {
    if (lat == null || lon == null) return
    const ctrl = new AbortController()
    setState({ ...EMPTY, loading: true })

    fetch(`/engine/prediction?lat=${lat}&lon=${lon}`, { signal: ctrl.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Prediction engine returned ${r.status}`)
        return (await r.json()) as EngineResponse
      })
      .then((j) =>
        setState({
          loading: false,
          error: null,
          source: j.source,
          hotspotsAvailable: j.hotspots_available,
          byDate: Object.fromEntries(j.days.map((d) => [d.date, d])),
          notes: j.notes ?? [],
        }),
      )
      .catch((e: unknown) => {
        if ((e as Error).name === 'AbortError') return
        setState({ ...EMPTY, error: (e as Error).message || 'Prediction engine unreachable' })
      })

    return () => ctrl.abort()
  }, [lat, lon])

  return state
}
