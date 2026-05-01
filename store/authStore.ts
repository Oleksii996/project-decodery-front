import { create } from 'zustand';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  avatar?: string;
  dueDate?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false, 
  isLoading: false,
  error: null,

  setUser: (user) => set({ 
    user, 
    isLoggedIn: !!user 
  }),

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post('/api/auth/logout'); 
  
      set({ user: null, isLoggedIn: false, error: null });
   
      window.location.href = '/'; 
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Помилка при виході';
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));