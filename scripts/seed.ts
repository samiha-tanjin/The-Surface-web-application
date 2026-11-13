/* npm run db:seed  -> indexes + judge demo account + synthetic hotspots/calendar. Safe to re-run. */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { getDb, ensureIndexes, closeDb } from '../api/_lib/db.js';
import process from 'process';

const DEMO = { email: 'judge@thesurface.app', password: 'SpaceApps2026' };
const REG: Record<string, [number, number, number, number]> = { // lat, lon, fires/day, spread
  'Southern California': [34.2, -118.4, 6, .6], 'Northern California': [39.6, -121.6, 5, .8], 'Amazon Basin': [-9, -62, 14, 2.5],
  'New South Wales': [-33, 149.5, 4, 1.2], 'Greece': [38.2, 23.4, 4, .7], 'Siberia': [62, 110, 9, 3], 'Portugal': [40.2, -8, 3, .5],
  'British Columbia': [54, -122, 4, 1.2], 'Kalimantan': [-2, 114, 10, 1.5], 'Chittagong Hill Tracts': [22.6, 92.2, 3, .5], 'Central Africa': [-4, 22, 16, 3.5],
};
const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const key = (d: string, lat: number, lon: number) => `${d}_${Math.round(lat / .01)}_${Math.round(lon / .01)}`;
const iso = (d: Date) => d.toISOString().slice(0, 10);

async function main() {
  const db = await getDb();
  await ensureIndexes();

  // 1) Judge demo account
  await db.collection('users').updateOne({ email: DEMO.email }, {
    $set: { name: 'Judge Demo', passwordHash: await bcrypt.hash(DEMO.password, 10), isDemo: true,
      location: { city: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
      preferences: { alerts: ['Hotspot within 50 km', 'Daily Surfie briefing'], units: 'metric' } },
    $setOnInsert: { email: DEMO.email, createdAt: new Date() },
  }, { upsert: true });

  // 2) Synthetic MODIS + VIIRS detections, merged into one collection (same day + ~1 km cell => one doc, sources: [..])
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  const ops: any[] = []; let raw = 0;
  for (let n = 165; n >= 0; n--) {
    const d = new Date(today.getTime() - n * 864e5), ds = iso(d), m = d.getUTCMonth() + 1;
    for (const [region, [la, lo, base, s]] of Object.entries(REG)) {
      const k = (m >= 6 && m <= 10) ? 1.2 : .5;
      const count = Math.max(0, Math.round(base * k + gauss() * base * .4));
      for (let i = 0; i < count; i++) {
        const lat = la + gauss() * s, lon = lo + gauss() * s, frp = +(-Math.log(Math.random()) * 18 + 3).toFixed(1);
        for (const src of ['VIIRS', 'MODIS'] as const) {
          if (Math.random() > (src === 'VIIRS' ? .7 : .55)) continue;
          raw++;
          const la2 = src === 'MODIS' ? lat + gauss() * .004 : lat, lo2 = src === 'MODIS' ? lon + gauss() * .004 : lon;
          ops.push({ updateOne: { filter: { dedupeKey: key(ds, la2, lo2) }, upsert: true, update: {
            $setOnInsert: { dedupeKey: key(ds, la2, lo2), lat: +la2.toFixed(4), lon: +lo2.toFixed(4),
              geo: { type: 'Point', coordinates: [+lo2.toFixed(4), +la2.toFixed(4)] }, acqDate: d, confidence: Math.random() > .3 ? 'high' : 'nominal', region },
            $addToSet: { sources: src }, $max: { frp } } } });
        }
      }
    }
  }
  for (let i = 0; i < ops.length; i += 1000) await db.collection('hotspots').bulkWrite(ops.slice(i, i + 1000), { ordered: false });

  // 3) Calendar collection derived from hotspots (what the BurningCalendar reads)
  await db.collection('hotspots').aggregate([
    { $group: { _id: { d: { $dateToString: { format: '%Y-%m-%d', date: '$acqDate' } }, r: { $ifNull: ['$region', 'Unknown'] } }, n: { $sum: 1 }, maxFrp: { $max: '$frp' } } },
    { $group: { _id: '$_id.d', count: { $sum: '$n' }, maxFrp: { $max: '$maxFrp' }, regions: { $push: { k: '$_id.r', v: '$n' } } } },
    { $project: { _id: 0, date: '$_id', count: 1, maxFrp: 1, regions: { $arrayToObject: '$regions' } } },
    { $merge: { into: 'fire_days', on: 'date', whenMatched: 'replace', whenNotMatched: 'insert' } },
  ]).toArray();

  const unique = await db.collection('hotspots').countDocuments();
  await db.collection('merge_runs').insertOne({ at: new Date(), mode: 'demo-seed', rawDetections: raw, uniqueHotspots: unique, duplicatesMerged: raw - unique });
  console.log(`Seeded. users=${await db.collection('users').countDocuments()} hotspots=${unique} (merged ${raw - unique} duplicates) fire_days=${await db.collection('fire_days').countDocuments()}`);
  console.log(`Demo login: ${DEMO.email} / ${DEMO.password}`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(closeDb);