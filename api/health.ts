import type { VercelRequest, VercelResponse } from "@vercel/node"
import { getDb } from "./_lib/db.js"

// Local checkup: open http://localhost:5173/api/health
// Shows only yes/no for each setting, never the values. Disabled in production.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  if (process.env.VERCEL_ENV === "production") {
    res.status(404).json({ error: "Not found" })
    return
  }

  const has = (name: string) => Boolean(process.env[name])
  const report: Record<string, unknown> = {
    MONGODB_URI: has("MONGODB_URI"),
    JWT_SECRET: has("JWT_SECRET") && (process.env.JWT_SECRET?.length ?? 0) >= 16,
    XAI_API_KEY: has("XAI_API_KEY"),
    XAI_MODEL: process.env.XAI_MODEL || "grok-4.5 (default)",
    JUDGE_EMAIL: process.env.JUDGE_EMAIL || "judge@thesurface.demo (default)",
  }

  try {
    const db = await getDb()
    await db.command({ ping: 1 })
    report.database = "connected"
    const email = (process.env.JUDGE_EMAIL ?? "judge@thesurface.demo").toLowerCase()
    report.judgeAccountExists = (await db.collection("users").countDocuments({ email, isJudge: true })) > 0
  } catch (err) {
    report.database = `FAILED: ${err instanceof Error ? err.message.slice(0, 160) : "unknown error"}`
  }

  res.status(200).json(report)
}