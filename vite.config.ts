import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // Read .env on the server side only. MAP_KEY has no VITE_ prefix, so Vite
  // never sends it to the browser. The key is added here, to the request
  // that goes to NASA, and nowhere else.
  const env = loadEnv(mode, import.meta.dirname, '')
  const mapKey = (env.MAP_KEY ?? '').trim()
  if (!mapKey) {
    console.warn('[firms] MAP_KEY was not found in .env, so hotspot requests will fail.')
  }

  // The browser calls /firms-api/area/<SOURCE>/<AREA>/<DAYS>.
  // This forwards it to NASA FIRMS with the key added.
  const firmsProxy = {
    '/firms-api/area': {
      target: 'https://firms.modaps.eosdis.nasa.gov',
      changeOrigin: true,
      rewrite: (p: string) =>
        p.replace(/^\/firms-api\/area\//, `/api/area/csv/${mapKey}/`),
    },
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: { proxy: firmsProxy },
    preview: { proxy: firmsProxy },
  }
})