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

/** Як у онбордингу: у PATCH лише YYYY-MM-DD. Повний ISO з GET часто ламає валідацію бекенду. */
function toBackendDueDateOnly(value: string): string {
  const trimmed = value?.trim() ?? '';
  if (!trimmed) return trimmed;
  const ymd = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
  if (ymd) return ymd[1];
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return trimmed;
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

function dateOnlyFromApi(value: string | null | undefined): string {
  if (value == null || value === '') return '';
  const m = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : toBackendDueDateOnly(String(value));
}

function normalizeProfile(data: BackendProfile): UserProfile {
  const resolvedAvatar = data.avatar ?? data.avatarUrl ?? null;
  const rawDue =
    data.expectedDueDate ?? data.dueDate ?? '';

  return {
    name: data.name,
    email: data.email,
    childGender: toChildGender(data.childGender ?? data.gender ?? null),
    expectedDueDate: dateOnlyFromApi(rawDue),
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
  await clientApi.patch('/profile', {
    name: payload.name.trim(),
    email: payload.email.trim(),
    gender: toBackendGender(payload.childGender),
    dueDate: toBackendDueDateOnly(payload.expectedDueDate),
  });

  const { data } = await clientApi.get<BackendProfile>('/profile/me');
  return normalizeProfile(data);
}

export async function uploadProfileAvatar(file: File): Promise<UserProfile> {
  const formData = new FormData();
  formData.append('avatar', file);

  await clientApi.patch('/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { data } = await clientApi.get<BackendProfile>('/profile/me');
  return normalizeProfile(data);
}
