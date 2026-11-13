import { FormEvent, useState } from "react"
import { judgeLogin, login, type SessionUser } from "../../lib/auth"
import "./LoginModal.css"

type Props = {
  onClose: () => void
  onLoggedIn: (user: SessionUser, token: string) => void
  onSwitchToSignup: () => void
}

export default function LoginModal({ onClose, onLoggedIn, onSwitchToSignup }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function run(action: () => Promise<{ token: string; user: SessionUser }>) {
    setBusy(true)
    setError("")
    try {
      const { token, user } = await action()
      onLoggedIn(user, token)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.")
    } finally {
      setBusy(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void run(() => login(email, password))
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
        <button className="modal-close" onClick={onClose} aria-label="Close sign in">
          ×
        </button>
        <span className="eyebrow coral">Welcome back</span>
        <h2 id="login-title">Sign in.</h2>
        <p className="signup-intro">Sign in to chat with Surfie about your day.</p>

        <button className="demo-login" type="button" disabled={busy} onClick={() => void run(judgeLogin)}>
          Continue as judge (Dhaka demo account)
        </button>
        <div className="login-or">
          <span>or use your own account</span>
        </div>

        <form className="signup-form" onSubmit={submit}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}
          <button className="signup-submit" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"} <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="signup-note">
          New here?{" "}
          <button type="button" onClick={onSwitchToSignup}>
            Create an account
          </button>
        </p>
      </section>
    </div>
  )
}
