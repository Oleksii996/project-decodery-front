'use client';

import { useEffect } from 'react';
import { refreshToken } from '@/features/auth/api';
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

        setAuthUser(data.user);
      } catch {
        clearAuthUser();
      }
    };

    checkAuth();
  }, [setAuthUser, clearAuthUser]);

  return children;
}
