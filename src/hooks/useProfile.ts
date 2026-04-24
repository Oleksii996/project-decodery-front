'use client'

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from '@/api/profileClient'
import type { ProfileUpdatePayload } from '@/types/profile'

export const profileQueryKey = ['profile'] as const

export function useProfileQuery() {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getProfile,
  })
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ProfileUpdatePayload) => updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(profileQueryKey, data)
    },
  })
}

export function useUploadAvatarMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => uploadAvatar(file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileQueryKey })
    },
  })
}
