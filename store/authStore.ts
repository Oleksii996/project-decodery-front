import { User } from '@/features/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isAuth: boolean;
  userInfo: User | null;
  setAuthUser: (userInfo: User) => void;
  clearAuthUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      isAuth: false,
      userInfo: null,

      setAuthUser: (userInfo: User) =>
        set({
          isAuth: true,
          userInfo,
        }),

      clearAuthUser: () =>
        set({
          isAuth: false,
          userInfo: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
