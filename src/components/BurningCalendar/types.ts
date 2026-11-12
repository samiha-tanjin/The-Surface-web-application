export interface TimelineStep {
  /** Date text shown to the reader, e.g. "May 4, 2000" or "Summer 2005". */
  when: string
  label: string
}

export interface FireEvent {
  id: string
  name: string
  year: number
  /** The date range exactly as written in the source data. */
  dates: string
  location: string
  /** Pattern and cause / drivers. */
  pattern: string
  impact: string
  /** true when the source gives an exact start day; the fire is then named on that day. */
  startExact: boolean
  /** YYYY-MM-DD. Exact start day if startExact, otherwise the first day of the stated period. */
  startDate: string
  /** YYYY-MM-DD. Exact end day if endExact, otherwise the last day of the stated period. */
  endDate: string
  endExact: boolean
  timeline: TimelineStep[]
}