import { User } from '@/features/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isAuth: boolean;
  isAuthReady: boolean;
  userInfo: User | null;
  setAuthUser: (userInfo: User) => void;
  clearAuthUser: () => void;
  setAuthReady: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      isAuth: false,
      isAuthReady: false,
      userInfo: null,

      setAuthUser: (userInfo: User) =>
        set({
          isAuth: true,
          isAuthReady: true,
          userInfo,
        }),

      clearAuthUser: () =>
        set({
          isAuth: false,
          isAuthReady: true,
          userInfo: null,
        }),
      setAuthReady: () =>
        set({
          isAuthReady: true,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
