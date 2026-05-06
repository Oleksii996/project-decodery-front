import { clientApi } from '@/lib/api/clientApi';
import type {
  ChildGender,
  UpdateProfilePayload,
  UserProfile,
} from './types';

type BackendGender = 'boy' | 'girl' | null;

type BackendProfile = {
  name: string;
  email: string;
  gender?: BackendGender;
  childGender?: ChildGender;
  dueDate?: string | null;
  expectedDueDate?: string | null;
  avatar?: string | null;
  avatarUrl?: string | null;
};

function toChildGender(value: BackendProfile['gender'] | ChildGender): ChildGender {
  if (value === 'girl' || value === 'female') return 'female';
  if (value === 'boy' || value === 'male') return 'male';
  return 'unspecified';
}

function toBackendGender(value: ChildGender): BackendGender {
  if (value === 'female') return 'girl';
  if (value === 'male') return 'boy';
  return null;
}

function normalizeProfile(data: BackendProfile): UserProfile {
  const resolvedAvatar = data.avatar ?? data.avatarUrl ?? null;

  return {
    name: data.name,
    email: data.email,
    childGender: toChildGender(data.childGender ?? data.gender ?? null),
    expectedDueDate: data.expectedDueDate ?? data.dueDate ?? '',
    avatar: resolvedAvatar,
    avatarUrl: data.avatarUrl ?? resolvedAvatar,
  };
}

export async function getCurrentProfile(): Promise<UserProfile> {
  const { data } = await clientApi.get<BackendProfile>('/profile/me');
  return normalizeProfile(data);
}

export async function updateCurrentProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  const requestBody = {
    name: payload.name,
    email: payload.email,
    gender: toBackendGender(payload.childGender),
    dueDate: payload.expectedDueDate,
  };

  const { data } = await clientApi.patch<BackendProfile>('/profile', requestBody);
  return normalizeProfile(data);
}

export async function uploadProfileAvatar(file: File): Promise<UserProfile> {
  const formData = new FormData();
  formData.append('avatar', file);

  const { data } = await clientApi.patch<BackendProfile>(
    '/profile/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return normalizeProfile(data);
}
