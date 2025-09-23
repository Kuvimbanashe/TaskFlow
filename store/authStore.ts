import { create } from "zustand";
import { User } from "@/types";
import mockData from "@/mockData.json";

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => boolean;
  signup: (fullName: string, email: string, password: string) => boolean;
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

  signup: (fullName, email, password) => {
    const exists = mockData.users.find((u) => u.email === email);
    if (exists) return false;

    const newUser: User = {
      id: mockData.users.length + 1,
      fullName,
      email,
      password,
    };

    mockData.users.push(newUser);
    set({ currentUser: newUser, isAuthenticated: true });
    return true;
  },

  signout: () => set({ currentUser: null, isAuthenticated: false }),
}));

export default useAuthStore;
