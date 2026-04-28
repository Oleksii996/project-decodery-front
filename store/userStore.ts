import { User } from '@/features/auth/types';
import { create } from 'zustand';

interface AuthStore {
  isAuth: boolean;
  userInfo: User | null;
  setAuthUser: (userInfo: User) => void;
  clearAuthUser: () => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  isAuth: false,
  userInfo: null,
  setAuthUser: (userInfo: User) => {
    set(() => {
      return {
        isAuth: true,
        userInfo: userInfo,
      };
    });
  },
  clearAuthUser: () => {
    set(() => {
      return {
        isAuth: false,
        userInfo: null,
      };
    });
  },
}));
