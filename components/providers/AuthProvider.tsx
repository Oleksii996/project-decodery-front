'use client';

import { useEffect } from 'react';
import { getMe, refreshToken } from '@/features/auth/api';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setAuthUser = useAuthStore(s => s.setAuthUser);
  const clearAuthUser = useAuthStore(s => s.clearAuthUser);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await refreshToken();
        if (data.success) {
          const user = await getMe();
          setAuthUser(user);
        }
      } catch {
        clearAuthUser();
      }
    };

    checkAuth();
  }, [setAuthUser, clearAuthUser]);

  return children;
}
