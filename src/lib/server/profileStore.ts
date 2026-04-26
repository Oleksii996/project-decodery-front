import type { ProfileUpdatePayload, UserProfile } from '@/types/profile'
import { getDb } from './mongodb'

const INITIAL_PROFILE: UserProfile = {
  id: 'demo-user',
  name: 'Олена',
  email: 'olena@example.com',
  avatarUrl: null,
  childGender: 'unspecified',
  expectedDueDate: '2026-08-15',
}

type ProfileDoc = UserProfile & { _id?: unknown }

function toUserProfile(doc: ProfileDoc): UserProfile {
  return {
    id: doc.id,
    name: doc.name,
    email: doc.email,
    avatarUrl: doc.avatarUrl,
    childGender: doc.childGender,
    expectedDueDate: doc.expectedDueDate,
  }
}

async function ensureProfileByUserId(userId: string): Promise<UserProfile> {
  const db = await getDb()
  const collection = db.collection<ProfileDoc>('profiles')

  const existing = await collection.findOne({ id: userId })
  if (existing) return toUserProfile(existing)

  const created: UserProfile = {
    ...INITIAL_PROFILE,
    id: userId,
  }

  await collection.insertOne(created)
  return created
}

export async function getProfileByUserId(userId: string): Promise<UserProfile> {
  return ensureProfileByUserId(userId)
}

export async function updateProfileByUserId(
  userId: string,
  payload: ProfileUpdatePayload,
): Promise<UserProfile> {
  const db = await getDb()
  const collection = db.collection<ProfileDoc>('profiles')

  const current = await ensureProfileByUserId(userId)
  const next: UserProfile = {
    ...current,
    ...payload,
  }

  await collection.updateOne(
    { id: userId },
    {
      $set: {
        name: next.name,
        email: next.email,
        childGender: next.childGender,
        expectedDueDate: next.expectedDueDate,
      },
    },
  )

  return next
}
