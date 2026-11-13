import type { Collection, WithId } from "mongodb"
import { getDb } from "./db.js"

export type UserLocation = {
  city: string
  country: string
  latitude: number
  longitude: number
}

export type UserDoc = {
  name: string
  email: string
  passwordHash: string
  location: UserLocation
  isJudge?: boolean
  usage?: { day: string; chats: number }
  createdAt: Date
}

export async function usersCollection(): Promise<Collection<UserDoc>> {
  const db = await getDb()
  return db.collection<UserDoc>("users")
}

/** Only these fields ever go to the browser. Never the password hash. */
export function publicUser(u: WithId<UserDoc>) {
  return {
    id: u._id.toString(),
    name: u.name,
    email: u.email,
    location: u.location,
    isJudge: Boolean(u.isJudge),
  }
}
