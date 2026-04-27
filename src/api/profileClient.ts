import type { ProfileUpdatePayload, UserProfile } from '@/types/profile'

const JSON_HEADERS = { 'Content-Type': 'application/json' } as const

function apiBase(): string | null {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL
  if (typeof raw !== 'string' || !raw.trim()) return null
  return raw.replace(/\/$/, '')
}

function isMockApiMode(): boolean {
  return apiBase() === null
}

let mockProfile: UserProfile = {
  id: 'demo-user',
  name: 'Олена',
  email: 'olena@example.com',
  avatarUrl: null,
  childGender: 'unspecified',
  expectedDueDate: '2026-08-15',
}

const delay = (ms = 280) => new Promise((r) => setTimeout(r, ms))

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  if (!text) return {} as T
  return JSON.parse(text) as T
}

export async function getProfile(): Promise<UserProfile> {
  if (isMockApiMode()) {
    await delay()
    return { ...mockProfile }
  }

  const res = await fetch(`${apiBase()}/profile`, { credentials: 'include' })
  if (!res.ok) throw new Error('PROFILE_LOAD_FAILED')
  return parseJson<UserProfile>(res)
}

export async function updateProfile(
  payload: ProfileUpdatePayload,
): Promise<UserProfile> {
  if (isMockApiMode()) {
    await delay()
    mockProfile = {
      ...mockProfile,
      ...payload,
    }
    return { ...mockProfile }
  }

  const res = await fetch(`${apiBase()}/profile`, {
    method: 'PATCH',
    credentials: 'include',
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('PROFILE_UPDATE_FAILED')
  return parseJson<UserProfile>(res)
}

export async function uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
  await delay()
  const avatarUrl = URL.createObjectURL(file)
  if (mockProfile.avatarUrl?.startsWith('blob:')) {
    URL.revokeObjectURL(mockProfile.avatarUrl)
  }
  mockProfile = { ...mockProfile, avatarUrl }
  return { avatarUrl }
}
