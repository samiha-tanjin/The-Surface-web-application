import type { FireRisk } from '../lib/firePrediction'
import './FireWarning.css'

const ICON: Record<FireRisk['level'], string> = {
  low: '',
  moderate: '⚠️',
  high: '🔥',
  extreme: '🚨',
}

/** Small warning marker for one calendar day. Renders nothing for low/unknown risk. */
export function FireWarning({ risk }: { risk?: FireRisk }) {
  if (!risk || risk.level === 'low') return null
  return (
    <span
      className={`fire-warning fire-warning--${risk.level}`}
      role="img"
      aria-label={`${risk.level} wildfire risk`}
      title={`${risk.level.toUpperCase()} wildfire risk (${risk.score}/100): ${risk.reason}`}
    >
      {ICON[risk.level]}
    </span>
  )
}

/** One-line status shown above/below the calendar. Renders nothing when all is well. */
export function PredictionNotice(props: { loading: boolean; error: string | null; hotspotsAvailable: boolean }) {
  let text: string | null = null
  if (props.loading) text = 'Loading wildfire risk estimate…'
  else if (props.error) text = 'Wildfire risk estimate unavailable right now.'
  else if (!props.hotspotsAvailable) text = 'Risk estimate uses weather only (NASA hotspot data unavailable).'
  if (!text) return null
  return <p className="fire-notice">{text}</p>
}
