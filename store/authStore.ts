"use client";

import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Cookies.get("isLoggedIn") === "true",
  login: () => {
    Cookies.set("isLoggedIn", "true");
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("isLoggedIn");
    set({ isAuthenticated: false });
  },
}));

export default useAuthStore;
