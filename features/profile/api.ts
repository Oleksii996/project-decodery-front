import { clientApi } from '@/lib/api/clientApi';
import type { UpdateProfilePayload, UserProfile } from './types';

export async function getCurrentProfile(): Promise<UserProfile> {
  const { data } = await clientApi.get<UserProfile>('/profile/me');
  return data;
}

export async function updateCurrentProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  const { data } = await clientApi.patch<UserProfile>('/profile', payload);
  return data;
}

export async function uploadProfileAvatar(file: File): Promise<UserProfile> {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await clientApi.patch<UserProfile>(
    '/profile/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
}
