import type { VercelRequest, VercelResponse } from "@vercel/node"
import { ObjectId } from "mongodb"
import { userIdFromRequest } from "./_lib/auth.js"
import { allowMethod } from "./_lib/http.js"
import { publicUser, usersCollection } from "./_lib/users.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethod(req, res, "GET")) return
  try {
    const id = userIdFromRequest(req)
    if (!id || !ObjectId.isValid(id)) {
      res.status(401).json({ error: "Not signed in." })
      return
    }
    const users = await usersCollection()
    const user = await users.findOne({ _id: new ObjectId(id) })
    if (!user) {
      res.status(401).json({ error: "Not signed in." })
      return
    }
    res.status(200).json({ user: publicUser(user) })
  } catch (err) {
    console.error("[me]", err)
    res.status(500).json({ error: "Server error. Please try again." })
  }
}
