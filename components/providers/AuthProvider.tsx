'use client';

import { useEffect } from 'react';
import { getMe, getSession, refreshToken } from '@/features/auth/api';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const setAuthUser = useAuthStore(s => s.setAuthUser);
  const clearAuthUser = useAuthStore(s => s.clearAuthUser);
  const setAuthReady = useAuthStore(s => s.setAuthReady);
  const isAuthReady = useAuthStore(s => s.isAuthReady);

  useEffect(() => {
    let ignore = false;

    const initAuth = async () => {
      try {
        const session = await getSession();

        if (!session.authenticated) {
          if (!ignore) {
            clearAuthUser();
          }
          return;
        }

        try {
          const user = await getMe();

          if (!ignore) {
            setAuthUser(user);
          }
        } catch {
          await refreshToken();

          const user = await getMe();

          if (!ignore) {
            setAuthUser(user);
          }
        }
      } catch {
        if (!ignore) {
          clearAuthUser();
        }
      } finally {
        if (!ignore) {
          setAuthReady();
        }
      }
    };

    initAuth();

    return () => {
      ignore = true;
    };
  }, [setAuthUser, clearAuthUser, setAuthReady]);

  if (!isAuthReady) {
    return null;
  }

  return children;
}
