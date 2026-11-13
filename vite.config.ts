import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import fs from 'node:fs'

// Runs the files in /api inside "npm run dev", so login and the chatbot work
// locally without the Vercel CLI. On Vercel itself the real serverless
// functions are used instead, so this plugin only exists in development.
function localApi(env: Record<string, string>): Plugin {
  return {
    name: 'local-api',
    apply: 'serve',
    configureServer(server) {
      // Make the .env values visible to the API code (process.env.X).
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value
      }

      server.middlewares.use(async (req, res, next) => {
        const url = req.url ?? ''
        if (!url.startsWith('/api/')) return next()

        const name = url.slice('/api/'.length).split('?')[0].replace(/\/+$/, '')
        // Letters, digits and dashes only: blocks "_lib" and path tricks.
        if (!/^[a-z0-9-]+$/i.test(name)) return next()
        const file = path.resolve(import.meta.dirname, 'api', `${name}.ts`)
        if (!fs.existsSync(file)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: `No API route /api/${name}` }))
          return
        }

        try {
          // Read the JSON body the way Vercel does.
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const raw = Buffer.concat(chunks).toString('utf8')
          let body: unknown = undefined
          if (raw) {
            try {
              body = JSON.parse(raw)
            } catch {
              body = raw
            }
          }

          const vreq = Object.assign(req, { body, query: {} })
          const vres = Object.assign(res, {
            status(code: number) {
              res.statusCode = code
              return vres
            },
            json(data: unknown) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
              return vres
            },
          })

          const mod = await server.ssrLoadModule(`/api/${name}.ts`)
          await mod.default(vreq, vres)
        } catch (err) {
          console.error(`[api/${name}]`, err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Server error. See the terminal for details.' }))
          }
        }
      })
    },
  }
}

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
    plugins: [react(), tailwindcss(), localApi(env)],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: { proxy: firmsProxy },
    preview: { proxy: firmsProxy },
  }
})