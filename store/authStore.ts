import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';
import { authApi } from '@/lib/mockApi';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const user = await authApi.login(email, password);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },

      logout:async () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (userData) => {
        try {
          const user = await authApi.register(userData);
          set({ user, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);