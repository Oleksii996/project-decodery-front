export type ChildGender = 'male' | 'female' | 'unspecified'

export type UserProfile = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  childGender: ChildGender
  /** ISO date string YYYY-MM-DD */
  expectedDueDate: string
}

export type ProfileUpdatePayload = Pick<
  UserProfile,
  'name' | 'email' | 'childGender' | 'expectedDueDate'
>
