import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ObjectId } from "mongodb"
import { askGrok, buildSystemPrompt, ruleBasedAdvice, type ChatTurn } from "./_lib/advice.js"
import { userIdFromRequest } from "./_lib/auth.js"
import { allowMethod, readBody } from "./_lib/http.js"
import { getWeatherSummary } from "./_lib/power.js"
import { usersCollection } from "./_lib/users.js"

const DAILY_LIMIT = 60 // protects the Grok key if the demo link is shared widely

function cleanHistory(raw: unknown): ChatTurn[] {
  if (!Array.isArray(raw)) return []
  const out: ChatTurn[] = []
  for (const item of raw.slice(-6)) {
    if (!item || typeof item !== "object") continue
    const { role, content } = item as { role?: unknown; content?: unknown }
    if ((role === "user" || role === "assistant") && typeof content === "string") {
      out.push({ role, content: content.slice(0, 600) })
    }
  }
  return out
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethod(req, res, "POST")) return
  try {
    const id = userIdFromRequest(req)
    if (!id || !ObjectId.isValid(id)) {
      res.status(401).json({ error: "Please sign in to chat with Surfie." })
      return
    }

    const body = readBody(req)
    const message = typeof body.message === "string" ? body.message.trim().slice(0, 500) : ""
    if (!message) {
      res.status(400).json({ error: "Type a message first." })
      return
    }

    const users = await usersCollection()
    const user = await users.findOne({ _id: new ObjectId(id) })
    if (!user) {
      res.status(401).json({ error: "Please sign in to chat with Surfie." })
      return
    }

    const today = new Date().toISOString().slice(0, 10)
    const used = user.usage?.day === today ? user.usage.chats : 0
    if (used >= DAILY_LIMIT) {
      res.status(429).json({ error: "Daily chat limit reached. Please try again tomorrow." })
      return
    }
    await users.updateOne({ _id: user._id }, { $set: { usage: { day: today, chats: used + 1 } } })

    const { city, country, latitude, longitude } = user.location
    let weather
    try {
      weather = await getWeatherSummary(latitude, longitude)
    } catch (err) {
      console.error("[chat] NASA POWER", err)
      res.status(502).json({ error: "NASA POWER data is unavailable right now. Please try again in a minute." })
      return
    }

    let reply: string
    let source: "grok" | "rules" = "grok"
    try {
      reply = await askGrok(buildSystemPrompt(city, country, weather), cleanHistory(body.history), message)
    } catch (err) {
      console.error("[chat] Grok", err)
      reply = ruleBasedAdvice(city, weather)
      source = "rules"
    }

    res.status(200).json({
      reply,
      source,
      weather: { city, country, latestDate: weather.latestDate },
    })
  } catch (err) {
    console.error("[chat]", err)
    res.status(500).json({ error: "Server error. Please try again." })
  }
}
