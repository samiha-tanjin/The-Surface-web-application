import { useMemo, useState } from "react"
import type { FireEvent } from "./types"
import "./BurningCalendar.css"

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const pad = (n: number) => String(n).padStart(2, "0")
const dayKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const parseKey = (k: string) => {
  const [y, m, d] = k.split("-").map(Number)
  return new Date(y, m - 1, d)
}

const panelFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
})
const longFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
})

// Every day shown for a month: full weeks, Sunday to Saturday.
function buildGrid(month: Date): Date[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0)
  const start = new Date(first)
  start.setDate(1 - first.getDay())
  const end = new Date(last)
  end.setDate(last.getDate() + (6 - last.getDay()))
  const days: Date[] = []
  for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) days.push(new Date(d))
  return days
}

// Only meaningful when both the start and the end day are exact.
const durationDays = (e: FireEvent) =>
  Math.round((parseKey(e.endDate).getTime() - parseKey(e.startDate).getTime()) / 86400000) + 1

interface Props {
  events?: FireEvent[]
}

export default function BurningCalendar({ events = [] }: Props) {
  // Open on the most recent fire so the calendar is never empty on first load.
  const latest = useMemo(() => {
    const exact = events.filter((e) => e.startExact).map((e) => e.startDate)
    return exact.length ? parseKey(exact.reduce((a, b) => (a > b ? a : b))) : new Date()
  }, [events])

  const [month, setMonth] = useState(() => new Date(latest.getFullYear(), latest.getMonth(), 1))
  const [selected, setSelected] = useState(() => latest)
  // A fire with no exact start day, chosen from the list under the grid.
  const [pickedId, setPickedId] = useState<string | null>(null)

  const years = useMemo(() => {
    const ys = events.map((e) => e.year)
    const now = new Date().getFullYear()
    const min = Math.min(now, ...ys)
    const max = Math.max(now, ...ys)
    return Array.from({ length: max - min + 1 }, (_, i) => min + i)
  }, [events])

  // A fire is written on its start day, so only fires that start on `d` are listed.
  const startingOn = (d: Date) => {
    const k = dayKey(d)
    return events.filter((e) => e.startExact && e.startDate === k)
  }

  const monthStart = dayKey(new Date(month.getFullYear(), month.getMonth(), 1))
  const monthEnd = dayKey(new Date(month.getFullYear(), month.getMonth() + 1, 0))
  const monthCount = events.filter(
    (e) => e.startExact && e.startDate >= monthStart && e.startDate <= monthEnd,
  ).length
  const approxThisMonth = events.filter(
    (e) => !e.startExact && e.startDate <= monthEnd && e.endDate >= monthStart,
  )

  const todayKey = dayKey(new Date())
  const selectedKey = dayKey(selected)
  const picked = pickedId ? events.find((e) => e.id === pickedId) : undefined
  const selectedEvents = picked ? [picked] : startingOn(selected)

  const goMonth = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1))
  const jump = (y: number, m: number) => setMonth(new Date(y, m, 1))

  return (
    <section className="cal-section section-pad" id="calendar">
      <div className="wrap">
        <div className="cal-head">
          <div>
            <span className="eyebrow coral">Event calendar</span>
            <h2>Fires: When and Where</h2>
          </div>
          <div className="cal-controls">
            <button type="button" className="round-control" aria-label="Previous month" onClick={() => goMonth(-1)}>
              ‹
            </button>
            <select
              className="cal-select"
              aria-label="Month"
              value={month.getMonth()}
              onChange={(ev) => jump(month.getFullYear(), Number(ev.target.value))}
            >
              {MONTH_NAMES.map((name, i) => (
                <option key={name} value={i}>
                  {name}
                </option>
              ))}
            </select>
            <select
              className="cal-select"
              aria-label="Year"
              value={month.getFullYear()}
              onChange={(ev) => jump(Number(ev.target.value), month.getMonth())}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <button type="button" className="round-control" aria-label="Next month" onClick={() => goMonth(1)}>
              ›
            </button>
            <button
              type="button"
              className="cal-today"
              onClick={() => {
                const now = new Date()
                setMonth(new Date(now.getFullYear(), now.getMonth(), 1))
                setSelected(now)
                setPickedId(null)
              }}
            >
              Today
            </button>
          </div>
        </div>

        <div className="cal-layout">
          <div>
            <div className="cal-grid-card">
              <div className="cal-weekdays">
                {WEEKDAYS.map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>
              <div className="cal-days">
                {buildGrid(month).map((day) => {
                  const list = startingOn(day)
                  const key = dayKey(day)
                  const classes = [
                    "cal-day",
                    day.getMonth() !== month.getMonth() ? "is-outside" : "",
                    key === selectedKey && !picked ? "is-selected" : "",
                    key === todayKey ? "is-today" : "",
                  ].join(" ")
                  return (
                    <button
                      key={key}
                      type="button"
                      className={classes}
                      onClick={() => {
                        setSelected(day)
                        setPickedId(null)
                      }}
                      aria-pressed={key === selectedKey && !picked}
                      aria-label={`${longFmt.format(day)}, ${list.length} ${list.length === 1 ? "fire starts" : "fires start"}`}
                    >
                      <span className="cal-num">{day.getDate()}</span>
                      {list.slice(0, 2).map((e) => (
                        <span key={e.id} className="cal-pill" title={e.name}>
                          {e.name}
                        </span>
                      ))}
                      {list.length > 2 && <span className="cal-more">+{list.length - 2} more</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            {approxThisMonth.length > 0 && (
              <div className="cal-approx">
                <p className="cal-label">
                  No exact start date, burning during {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
                </p>
                <div className="cal-chips">
                  {approxThisMonth.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      className={`cal-chip${e.id === pickedId ? " is-selected" : ""}`}
                      aria-pressed={e.id === pickedId}
                      onClick={() => setPickedId(e.id)}
                    >
                      {e.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="cal-panel" aria-live="polite">
            <h3 className="cal-date">{picked ? picked.dates : panelFmt.format(selected)}</h3>
            <p className="cal-count">
              {monthCount} {monthCount === 1 ? "fire starts" : "fires start"} this month
              {approxThisMonth.length > 0 ? `, ${approxThisMonth.length} more with approximate dates` : ""}
            </p>

            {selectedEvents.length === 0 ? (
              <p className="cal-empty">No fire is recorded as starting on this day.</p>
            ) : (
              <ul className="cal-events">
                {selectedEvents.map((e) => (
                  <li key={e.id}>
                    <h4 className="cal-name">{e.name}</h4>

                    <div className="cal-field">
                      <p className="cal-label">Where</p>
                      <p>{e.location}</p>
                    </div>

                    <div className="cal-field">
                      <p className="cal-label">When</p>
                      <p>
                        {e.dates}
                        {e.startExact && e.endExact ? ` (${durationDays(e)} days)` : ""}
                      </p>
                    </div>

                    <div className="cal-field">
                      <p className="cal-label">Pattern and drivers</p>
                      <p>{e.pattern}</p>
                    </div>

                    <div className="cal-field">
                      <p className="cal-label">Impact</p>
                      <p>{e.impact}</p>
                    </div>

                    <div className="cal-field">
                      <p className="cal-label">Timeline</p>
                      <ol className="cal-steps">
                        {e.timeline.map((t) => (
                          <li key={t.when + t.label}>
                            <strong>{t.when}</strong>
                            <br />
                            {t.label}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}