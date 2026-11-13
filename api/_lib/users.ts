import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { getDb } from './db.js';

export interface UserDoc {
  _id?: ObjectId;
  email: string;            // stored lowercase
  name: string;
  passwordHash: string;
  location: { city: string; country?: string; lat: number; lon: number }; // captured at registration; Surfie uses it
  preferences?: { alerts: string[]; units: 'metric' | 'imperial' };
  isDemo?: boolean;
  createdAt: Date;
}

const col = async () => (await getDb()).collection<UserDoc>('users');

export const findUserByEmail = async (email: string) => (await col()).findOne({ email: email.trim().toLowerCase() });
export const findUserById = async (id: string) => (await col()).findOne({ _id: new ObjectId(id) });

export async function createUser(i: { email: string; password: string; name: string; location: UserDoc['location'] }) {
  const doc: UserDoc = {
    email: i.email.trim().toLowerCase(), name: i.name, location: i.location,
    passwordHash: await bcrypt.hash(i.password, 10),
    preferences: { alerts: [], units: 'metric' }, createdAt: new Date(),
  };
  const r = await (await col()).insertOne(doc);
  return { ...doc, _id: r.insertedId };
}

/** Returns the user if email+password match, otherwise null. */
export async function verifyLogin(email: string, password: string) {
  const u = await findUserByEmail(email);
  return u && (await bcrypt.compare(password, u.passwordHash)) ? u : null;
}

/** Safe to send to the browser (no hash). */
export const toPublicUser = (u: UserDoc) => ({
  id: String(u._id), email: u.email, name: u.name, location: u.location,
  preferences: u.preferences, isDemo: !!u.isDemo,
});