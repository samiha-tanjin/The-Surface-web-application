// Cities offered at signup. Coordinates live on the server so the browser can't send fake ones.
// Keep the names in sync with CITY_NAMES in src/lib/auth.ts.
export const CITIES: Record<string, { country: string; latitude: number; longitude: number }> = {
  Dhaka: { country: "Bangladesh", latitude: 23.8103, longitude: 90.4125 },
  Chattogram: { country: "Bangladesh", latitude: 22.3569, longitude: 91.7832 },
  Feni: { country: "Bangladesh", latitude: 23.0159, longitude: 91.3976 },
  Sylhet: { country: "Bangladesh", latitude: 24.8949, longitude: 91.8687 },
  Khulna: { country: "Bangladesh", latitude: 22.8456, longitude: 89.5403 },
  Rajshahi: { country: "Bangladesh", latitude: 24.3745, longitude: 88.6042 },
  "Cox's Bazar": { country: "Bangladesh", latitude: 21.4272, longitude: 92.0058 },
  "Los Angeles": { country: "United States", latitude: 34.0522, longitude: -118.2437 },
  Sydney: { country: "Australia", latitude: -33.8688, longitude: 151.2093 },
  Athens: { country: "Greece", latitude: 37.9838, longitude: 23.7275 },
  London: { country: "United Kingdom", latitude: 51.5072, longitude: -0.1276 },
}