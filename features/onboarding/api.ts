import { api } from '@/lib/api/api';
import type {
  OnboardingAvatarResponse,
  OnboardingAuthUser,
  UpdateOnboardingPayload,
} from './types';

export async function getCurrentOnboardingUser() {
  const { data } = await api.get<OnboardingAuthUser>('/users/current');

  return data;
}

export async function updateOnboardingUser(
  payload: UpdateOnboardingPayload,
) {
  const { data } = await api.patch<OnboardingAuthUser>('/users/current', payload);

  return data;
}

export async function uploadOnboardingAvatar(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await api.patch<OnboardingAvatarResponse>(
    '/users/me/avatar',
    formData,
  );

  return data;
}
