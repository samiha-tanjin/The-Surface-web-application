import { FormEvent, useEffect, useRef, useState } from "react"
import { api, ApiError, type SessionUser } from "../../lib/auth"
import "./Surfie.css"

type Message = { role: "user" | "assistant"; text: string }
type ChatResponse = {
  reply: string
  source: "grok" | "rules"
  weather: { city: string; country: string; latestDate: string }
}

type Props = {
  user: SessionUser
  token: string
  onSessionExpired: () => void
}

const SUGGESTIONS = ["Plan my day", "Good time for an evening walk?", "Should I carry an umbrella?"]

export default function Surfie({ user, token, onSessionExpired }: Props) {
  const firstName = user.name.split(" ")[0]
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi ${firstName}! I'm Surfie. Ask me to plan your day in ${user.location.city}, using recent NASA POWER weather data.`,
    },
  ])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [dataDate, setDataDate] = useState("")
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, busy])

  async function send(text: string) {
    const message = text.trim()
    if (!message || busy) return
    // The greeting is not part of the conversation Grok needs to see.
    const history = messages.slice(1).map((m) => ({ role: m.role, content: m.text }))
    setMessages((prev) => [...prev, { role: "user", text: message }])
    setInput("")
    setError("")
    setBusy(true)
    try {
      const data = await api<ChatResponse>("/api/chat", { token, body: { message, history } })
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }])
      setDataDate(data.weather.latestDate)
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        onSessionExpired()
        return
      }
      setError(err instanceof Error ? err.message : "Surfie could not answer. Try again.")
    } finally {
      setBusy(false)
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    void send(input)
  }

  return (
    <div className="surfie">
      <div className="chat-head">
        <span className="status-dot" />
        <strong>Surfie</strong>
        <span>
          {user.location.city}, {user.location.country}
        </span>
      </div>

      <div className="surfie-log" ref={logRef} aria-live="polite">
        {messages.map((m, i) => (
          <p key={i} className={`surfie-msg ${m.role === "user" ? "from-user" : "from-bot"}`}>
            {m.text}
          </p>
        ))}
        {busy && <p className="surfie-msg from-bot surfie-typing">Surfie is checking the data…</p>}
      </div>

      {error && (
        <p className="surfie-error" role="alert">
          {error}
        </p>
      )}

      <div className="surfie-chips">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" disabled={busy} onClick={() => void send(s)}>
            {s}
          </button>
        ))}
      </div>

      <form className="surfie-form" onSubmit={submit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your day…"
          maxLength={500}
          aria-label="Message Surfie"
          disabled={busy}
        />
        <button type="submit" disabled={busy || !input.trim()} aria-label="Send">
          →
        </button>
      </form>

      <p className="surfie-source">
        Weather: NASA POWER recent observations{dataDate ? `, latest day ${dataDate}` : ""}. Not a live forecast.
      </p>
    </div>
  )
}
