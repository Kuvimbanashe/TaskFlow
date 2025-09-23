
import { create } from "zustand";
import { User } from "@/types";
import mockData from "@/mockData.json";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => boolean;
  signout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  signin: (email, password) => {
    const user = mockData.users.find((u) => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user, isAuthenticated: true });
      return true;
    }
    return false;
  },
  signout: () => set({ currentUser: null, isAuthenticated: false }),
}));

export default useAuthStore;
