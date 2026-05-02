import { clientApi } from '@/lib/api/clientApi';
import type {
  OnboardingAvatarResponse,
  OnboardingAuthUser,
  UpdateOnboardingPayload,
} from './types';

export async function getCurrentOnboardingUser() {
  const { data } = await clientApi.get<OnboardingAuthUser>('/profile/me');

  return data;
}

export async function updateOnboardingUser(
  payload: UpdateOnboardingPayload,
) {
  const { data } = await clientApi.patch<OnboardingAuthUser>(
    '/profile',
    payload
  );

  return data;
}

export async function uploadOnboardingAvatar(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await clientApi.patch<OnboardingAvatarResponse>(
    '/profile/avatar',
    formData,
  );

  return data;
}
