import type { VercelRequest, VercelResponse } from "@vercel/node"
import bcrypt from "bcryptjs"
import type { WithId } from "mongodb"
import { signToken } from "./_lib/auth.js"
import { allowMethod, readBody } from "./_lib/http.js"
import { publicUser, usersCollection, type UserDoc } from "./_lib/users.js"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!allowMethod(req, res, "POST")) return
  try {
    const { email, password, demo } = readBody(req)
    const users = await usersCollection()
    let user: WithId<UserDoc> | null = null

    if (demo === true) {
      // One-click judge login. The judge account holds no private data.
      const judgeEmail = (process.env.JUDGE_EMAIL ?? "judge@thesurface.demo").toLowerCase()
      user = await users.findOne({ email: judgeEmail, isJudge: true })
      if (!user) {
        res.status(404).json({ error: "The judge account has not been created yet." })
        return
      }
    } else {
      if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
        res.status(400).json({ error: "Enter your email and password." })
        return
      }
      user = await users.findOne({ email: email.trim().toLowerCase() })
      const ok = user ? await bcrypt.compare(password, user.passwordHash) : false
      if (!user || !ok) {
        res.status(401).json({ error: "Incorrect email or password." })
        return
      }
    }

    res.status(200).json({ token: signToken(user._id.toString()), user: publicUser(user) })
  } catch (err) {
    console.error("[login]", err)
    res.status(500).json({ error: "Server error. Please try again." })
  }
}
