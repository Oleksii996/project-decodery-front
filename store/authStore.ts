import { User } from '@/features/auth/types';
import { create } from 'zustand';

interface AuthStore {
  isAuth: boolean;
  isAuthReady: boolean;
  userInfo: User | null;
  setAuthUser: (userInfo: User) => void;
  clearAuthUser: () => void;
  setAuthReady: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuth: false,
  isAuthReady: false,
  userInfo: null,

  setAuthUser: userInfo =>
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
}));
