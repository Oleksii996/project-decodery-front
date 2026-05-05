export type ChildGender = 'male' | 'female' | 'unspecified';

export interface UserProfile {
  name: string;
  email: string;
  childGender: ChildGender;
  expectedDueDate: string;
  avatarUrl?: string | null;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  childGender: ChildGender;
  expectedDueDate: string;
}
