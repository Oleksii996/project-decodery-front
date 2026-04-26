import { NextResponse, type NextRequest } from 'next/server'
import { getAuthorizedUserId } from '@/lib/server/auth'
import { getProfileByUserId, updateProfileByUserId } from '@/lib/server/profileStore'
import type { ChildGender, ProfileUpdatePayload } from '@/types/profile'

const ALLOWED_GENDERS: ChildGender[] = ['male', 'female', 'unspecified']

function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 })
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function validatePatch(body: unknown): {
  ok: true
  data: ProfileUpdatePayload
} | {
  ok: false
  message: string
} {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Invalid JSON body' }
  }

  const payload = body as Partial<ProfileUpdatePayload>

  if (typeof payload.name !== 'string' || payload.name.trim().length < 2) {
    return { ok: false, message: 'name must be at least 2 characters' }
  }

  if (typeof payload.email !== 'string' || !payload.email.includes('@')) {
    return { ok: false, message: 'email must be valid' }
  }

  if (!payload.childGender || !ALLOWED_GENDERS.includes(payload.childGender)) {
    return { ok: false, message: 'childGender must be male, female or unspecified' }
  }

  if (
    typeof payload.expectedDueDate !== 'string' ||
    !isValidDate(payload.expectedDueDate)
  ) {
    return { ok: false, message: 'expectedDueDate must be in YYYY-MM-DD format' }
  }

  return {
    ok: true,
    data: {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      childGender: payload.childGender,
      expectedDueDate: payload.expectedDueDate,
    },
  }
}

export async function GET(req: NextRequest) {
  const userId = getAuthorizedUserId(req)
  if (!userId) return unauthorized()

  const profile = await getProfileByUserId(userId)
  return NextResponse.json(profile, { status: 200 })
}

export async function PATCH(req: NextRequest) {
  const userId = getAuthorizedUserId(req)
  if (!userId) return unauthorized()

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return badRequest('Invalid JSON body')
  }

  const validation = validatePatch(body)
  if (!validation.ok) return badRequest(validation.message)

  const updated = await updateProfileByUserId(userId, validation.data)
  return NextResponse.json(updated, { status: 200 })
}
