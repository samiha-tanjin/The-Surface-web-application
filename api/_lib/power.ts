// NASA POWER daily point data (https://power.larc.nasa.gov).
// POWER is observed / modelled data that trails real time by a few days.
// It is NOT a forecast, so Surfie describes recent conditions and the trend.

export type DayWeather = {
  date: string // YYYY-MM-DD
  tempC: number | null
  maxC: number | null
  minC: number | null
  humidityPct: number | null
  rainMm: number | null
  windMs: number | null
  solarKwhM2: number | null
}

export type WeatherSummary = {
  latestDate: string
  latest: DayWeather
  days: DayWeather[]
  avgMaxC: number | null
  avgMinC: number | null
  avgRainMm: number | null
  rainyDays: number
  avgWindMs: number | null
  avgHumidityPct: number | null
  tempTrendC: number | null // recent 3 days minus the 4 days before them
}

const PARAMS = "T2M,T2M_MAX,T2M_MIN,RH2M,PRECTOTCORR,WS2M,ALLSKY_SFC_SW_DWN"
const MISSING = -990 // POWER uses -999 for "no data"

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, "")
}

function mean(values: Array<number | null>): number | null {
  const v = values.filter((x): x is number => x !== null)
  if (!v.length) return null
  return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10
}

export async function getWeatherSummary(latitude: number, longitude: number): Promise<WeatherSummary> {
  const end = new Date()
  const start = new Date(end.getTime() - 13 * 86_400_000)
  const url =
    "https://power.larc.nasa.gov/api/temporal/daily/point" +
    `?parameters=${PARAMS}&community=RE&longitude=${longitude}&latitude=${latitude}` +
    `&start=${ymd(start)}&end=${ymd(end)}&format=JSON`

  const r = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!r.ok) throw new Error(`NASA POWER responded ${r.status}`)
  const json = (await r.json()) as { properties?: { parameter?: Record<string, Record<string, number>> } }
  const p = json.properties?.parameter ?? {}

  const val = (key: string, d: string): number | null => {
    const v = p[key]?.[d]
    return typeof v === "number" && v > MISSING ? Math.round(v * 10) / 10 : null
  }

  const days: DayWeather[] = Object.keys(p.T2M ?? {})
    .sort()
    .map((d) => ({
      date: `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`,
      tempC: val("T2M", d),
      maxC: val("T2M_MAX", d),
      minC: val("T2M_MIN", d),
      humidityPct: val("RH2M", d),
      rainMm: val("PRECTOTCORR", d),
      windMs: val("WS2M", d),
      solarKwhM2: val("ALLSKY_SFC_SW_DWN", d),
    }))
    .filter((d) => d.tempC !== null)

  if (!days.length) throw new Error("NASA POWER returned no usable days")

  const last7 = days.slice(-7)
  const recent3 = mean(days.slice(-3).map((d) => d.tempC))
  const before4 = mean(days.slice(-7, -3).map((d) => d.tempC))

  return {
    latestDate: days[days.length - 1].date,
    latest: days[days.length - 1],
    days: last7,
    avgMaxC: mean(last7.map((d) => d.maxC)),
    avgMinC: mean(last7.map((d) => d.minC)),
    avgRainMm: mean(last7.map((d) => d.rainMm)),
    rainyDays: last7.filter((d) => (d.rainMm ?? 0) >= 1).length,
    avgWindMs: mean(last7.map((d) => d.windMs)),
    avgHumidityPct: mean(last7.map((d) => d.humidityPct)),
    tempTrendC: recent3 !== null && before4 !== null ? Math.round((recent3 - before4) * 10) / 10 : null,
  }
}
