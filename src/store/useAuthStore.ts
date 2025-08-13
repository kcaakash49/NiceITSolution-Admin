import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistStorage, StorageValue } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

// Define storage wrapper with correct StorageValue type
const sessionStorageWrapper: PersistStorage<AuthState> = {
  getItem: (name: string): Promise<StorageValue<AuthState> | null> => {
    const json = sessionStorage.getItem(name);
    if (!json) return Promise.resolve(null);
    try {
      return Promise.resolve(JSON.parse(json) as StorageValue<AuthState>);
    } catch {
      return Promise.resolve(null);
    }
  },
  setItem: (name: string, value: StorageValue<AuthState>) => {
    sessionStorage.setItem(name, JSON.stringify(value));
    return Promise.resolve();
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
    return Promise.resolve();
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: sessionStorageWrapper,
    }
  )
);
