import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginApi, type LoginPayload } from "../services/authService";
import { mockLogin, isMockAuthEnabled } from "../lib/mockAuth";

export type Role = "ADMIN" | "STAFF" | "CUSTOMER";
type User = {
  email: string;
  role: Role;
};
type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),

      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          console.log("log isMockAuthEnabled >>> ", isMockAuthEnabled);
          const response = isMockAuthEnabled
            ? await mockLogin(payload.email, payload.password)
            : await loginApi(payload);

          const { email, role, token } = response.data;
          set({ user: { email, role }, token, isLoading: false });
        } catch (err) {
          set({
            error: "Login failed. Please check your credentials.",
            isLoading: false,
          });
          throw err;
        }
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({ user: state?.user, token: state?.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
