import type { VercelRequest, VercelResponse } from "@vercel/node"

export function readBody(req: VercelRequest): Record<string, unknown> {
  const b: unknown = req.body
  if (!b) return {}
  if (typeof b === "string") {
    try {
      const parsed: unknown = JSON.parse(b)
      return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {}
    } catch {
      return {}
    }
  }
  return typeof b === "object" ? (b as Record<string, unknown>) : {}
}

export function allowMethod(req: VercelRequest, res: VercelResponse, method: string): boolean {
  if (req.method === method) return true
  res.setHeader("Allow", method)
  res.status(405).json({ error: "Method not allowed" })
  return false
}
