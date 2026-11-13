import { MongoClient, type Db } from "mongodb"

// One connection is reused between requests while the function stays warm.
let clientPromise: Promise<MongoClient> | null = null

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not set")
  if (!clientPromise) clientPromise = new MongoClient(uri).connect()
  const client = await clientPromise
  return client.db(process.env.MONGODB_DATABASE || "the_surface")
}
