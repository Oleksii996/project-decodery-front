import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCurrentProfile,
  updateCurrentProfile,
  uploadProfileAvatar,
} from './api';
import type { UpdateProfilePayload } from './types';

export const profileQueryKey = ['profile', 'me'] as const;

export function useProfileQuery() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getCurrentProfile,
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateCurrentProfile(payload),
    onSuccess: profile => {
      queryClient.setQueryData(profileQueryKey, profile);
    },
  });
}

export function useUploadAvatarMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfileAvatar(file),
    onSuccess: profile => {
      queryClient.setQueryData(profileQueryKey, profile);
    },
  });
}
