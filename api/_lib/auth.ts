import jwt from "jsonwebtoken"
import type { VercelRequest } from "@vercel/node"

function secret(): string {
  const s = process.env.JWT_SECRET
  if (!s || s.length < 16) throw new Error("JWT_SECRET is missing or too short")
  return s
}

export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, secret(), { expiresIn: "7d" })
}

/** Returns the user id from an "Authorization: Bearer <token>" header, or null. */
export function userIdFromRequest(req: VercelRequest): string | null {
  const header = req.headers.authorization ?? ""
  if (!header.startsWith("Bearer ")) return null
  try {
    const payload = jwt.verify(header.slice(7), secret())
    if (typeof payload === "object" && typeof payload.sub === "string") return payload.sub
    return null
  } catch {
    return null
  }
}
