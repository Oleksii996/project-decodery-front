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
    let ignore = false;

    const checkAuth = async () => {
      try {
        const data = await refreshToken();

        if (ignore) return;

        if (!data.success) {
          clearAuthUser();
          return;
        }

        const user = await getMe();

        if (ignore) return;

        setAuthUser(user);
      } catch {
        if (!ignore) {
          clearAuthUser();
        }
      }
    };

    checkAuth();

    return () => {
      ignore = true;
    };
  }, [setAuthUser, clearAuthUser]);

  return children;
}
