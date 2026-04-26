import type { NextRequest } from 'next/server'

/**
 * Private endpoint guard.
 * Accepts either:
 * - Authorization: Bearer <userId>
 * - x-user-id: <userId>
 */
export function getAuthorizedUserId(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice('Bearer '.length).trim()
    if (token) return token
  }

  const userIdHeader = req.headers.get('x-user-id')?.trim()
  if (userIdHeader) return userIdHeader

  return null
}
