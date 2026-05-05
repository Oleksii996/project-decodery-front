import type { NextConfig } from 'next'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** Каталог цього репозиторію (рядом із package.json). Фіксує Turbopack root, якщо вище є «чужі» lockfile. */
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

function allowedDevOriginsFromEnv(): string[] | undefined {
  const raw = process.env.NEXT_DEV_ALLOWED_ORIGINS
  if (!raw?.trim()) return undefined
  const list = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      if (entry.includes('://')) {
        try {
          return new URL(entry).hostname
        } catch {
          return entry
        }
      }
      return entry.split('/')[0]?.split(':')[0] ?? entry
    })
    .filter(Boolean)
  return list.length ? list : undefined
}

const allowedDevOrigins = allowedDevOriginsFromEnv()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  ...(allowedDevOrigins ? { allowedDevOrigins } : {}),
}

export default nextConfig
