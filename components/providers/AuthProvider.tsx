'use client';

import { useEffect } from 'react';
import { getMe, getSession } from '@/features/auth/api';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setAuthUser = useAuthStore(s => s.setAuthUser);
  const clearAuthUser = useAuthStore(s => s.clearAuthUser);

  useEffect(() => {
    let ignore = false;

    const checkSession = async () => {
      try {
        const session = await getSession();

        if (!session.authenticated) {
          clearAuthUser();
          return;
        }

        const user = await getMe();
        if (ignore) return;
        if (!ignore) {
          setAuthUser(user);
        }
      } catch {
        if (!ignore) {
          clearAuthUser();
        }
      }
    };

    checkSession();

    return () => {
      ignore = true;
    };
  }, [setAuthUser, clearAuthUser]);

  return children;
}
