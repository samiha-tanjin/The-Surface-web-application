import type { VercelRequest, VercelResponse } from "@vercel/node"
import bcrypt from "bcryptjs"
import { signToken } from "./_lib/auth.js"
import { CITIES } from "./_lib/cities.js"
import { getDb } from "./_lib/db.js"
import { allowMethod, readBody } from "./_lib/http.js"

const MAX_USERS = 500 // keeps a publicly shared demo link from filling the free database

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethod(req, res, "POST")) return
  try {
    const b = readBody(req)
    const name = typeof b.name === "string" ? b.name.trim().slice(0, 60) : ""
    const email = typeof b.email === "string" ? b.email.trim().toLowerCase().slice(0, 120) : ""
    const password = typeof b.password === "string" ? b.password : ""
    const city = typeof b.city === "string" ? b.city : ""
    const place = Object.prototype.hasOwnProperty.call(CITIES, city) ? CITIES[city] : undefined

    if (!name) return void res.status(400).json({ error: "Enter your name." })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return void res.status(400).json({ error: "Enter a valid email address." })
    if (password.length < 8 || password.length > 100) return void res.status(400).json({ error: "Password must be 8 to 100 characters." })
    if (!place) return void res.status(400).json({ error: "Choose your city." })

    const users = (await getDb()).collection("users")
    if ((await users.countDocuments()) >= MAX_USERS) return void res.status(503).json({ error: "Sign-ups are closed for the demo." })
    if (await users.findOne({ email })) return void res.status(409).json({ error: "An account with this email already exists." })

    const location = { city, country: place.country, latitude: place.latitude, longitude: place.longitude }
    let id: string
    try {
      const r = await users.insertOne({
        name, email, location, isJudge: false,
        passwordHash: await bcrypt.hash(password, 10),
        memory: { notes: [] },
        createdAt: new Date(),
      })
      id = r.insertedId.toString()
    } catch (err) {
      if ((err as { code?: number }).code === 11000) return void res.status(409).json({ error: "An account with this email already exists." })
      throw err
    }

    res.status(201).json({ token: signToken(id), user: { id, name, email, isJudge: false, location } })
  } catch (err) {
    console.error("[signup]", err)
    res.status(500).json({ error: "Server error. Please try again." })
  }
}