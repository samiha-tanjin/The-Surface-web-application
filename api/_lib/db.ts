import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'surface';

// Reuse the connection across serverless invocations (Vercel) and hot reloads.
const g = globalThis as unknown as { _mongo?: Promise<MongoClient> };

export async function getDb(): Promise<Db> {
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!g._mongo) g._mongo = new MongoClient(uri, { maxPoolSize: 5 }).connect();
  return (await g._mongo).db(dbName);
}

export async function closeDb() {
  if (g._mongo) { await (await g._mongo).close(); g._mongo = undefined; }
}

/** Idempotent. Run from `npm run db:seed` (or once per deploy). */
export async function ensureIndexes() {
  const db = await getDb();
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('hotspots').createIndex({ dedupeKey: 1 }, { unique: true });
  await db.collection('hotspots').createIndex({ geo: '2dsphere' });
  await db.collection('hotspots').createIndex({ acqDate: -1 });
  await db.collection('fire_days').createIndex({ date: 1 }, { unique: true });
  await db.collection('chat_messages').createIndex({ userId: 1, createdAt: -1 });
  // chat history auto-expires after 30 days
  await db.collection('chat_messages').createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });
}