import { getDb } from './db.js';

export interface Hotspot {
  dedupeKey: string; sources: ('MODIS' | 'VIIRS')[]; lat: number; lon: number;
  geo: { type: 'Point'; coordinates: [number, number] };
  acqDate: Date; frp: number; confidence?: string; region?: string;
}

/** Hotspots within `radiusKm` of a point, newest first (uses the 2dsphere index). */
export async function hotspotsNear(lat: number, lon: number, radiusKm = 300, days = 3) {
  const since = new Date(Date.now() - days * 864e5);
  return (await getDb()).collection<Hotspot>('hotspots')
    .find({ acqDate: { $gte: since }, geo: { $geoWithin: { $centerSphere: [[lon, lat], radiusKm / 6378.1] } } })
    .sort({ acqDate: -1 }).limit(500).toArray();
}

export async function recentHotspots(days = 3) {
  const since = new Date(Date.now() - days * 864e5);
  return (await getDb()).collection<Hotspot>('hotspots').find({ acqDate: { $gte: since } }).limit(2000).toArray();
}

/** Calendar data: one doc per day. */
export async function fireDays(from: string, to: string) {
  return (await getDb()).collection('fire_days').find({ date: { $gte: from, $lte: to } }).sort({ date: 1 }).toArray();
}