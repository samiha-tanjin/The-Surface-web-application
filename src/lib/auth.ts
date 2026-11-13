export type SessionUser = {
  id: string
  name: string
  email: string
  isJudge: boolean
  location: { city: string; country: string; latitude: number; longitude: number }
}

const TOKEN_KEY = "surface_token"

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function saveToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token)
  } catch {
    /* storage can be blocked; the session then lasts until the page reloads */
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export async function api<T>(path: string, options: { method?: string; body?: unknown; token?: string | null } = {}): Promise<T> {
  let res: Response
  try {
    res = await fetch(path, {
      method: options.method ?? (options.body ? "POST" : "GET"),
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
  } catch {
    throw new ApiError("Could not reach the server. Check your connection.", 0)
  }

  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    throw new ApiError("The server is not running. Start the app with \"npm run dev:full\".", res.status)
  }
  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error ?? "Something went wrong."
    throw new ApiError(message, res.status)
  }
  return data as T
}

type LoginResult = { token: string; user: SessionUser }

export async function login(email: string, password: string): Promise<LoginResult> {
  return api<LoginResult>("/api/login", { body: { email, password } })
}

export async function judgeLogin(): Promise<LoginResult> {
  return api<LoginResult>("/api/login", { body: { demo: true } })
}

export async function fetchMe(token: string): Promise<SessionUser> {
  const { user } = await api<{ user: SessionUser }>("/api/me", { token })
  return user
}
