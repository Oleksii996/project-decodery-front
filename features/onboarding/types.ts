export type BabyGender = 'boy' | 'girl' | 'unknown';
export type OnboardingGenderValue = BabyGender | '';
export type BackendGenderValue = Exclude<BabyGender, 'unknown'> | null;

export interface OnboardingFormValues {
  dueDate: string;
  gender: OnboardingGenderValue;
  avatar: File | null;
}

export interface UpdateOnboardingPayload {
  name?: string;
  dueDate: string;
  gender: BackendGenderValue;
}

export interface OnboardingAuthUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  dueDate?: string | null;
  gender?: BackendGenderValue;
  avatar?: string | null;
  isOnboardingCompleted?: boolean;
}

export interface OnboardingAvatarResponse {
  url: string;
}
