import { create } from "zustand";
import { createGuestUser } from "@/services/authService";

type TYPE_USER_STATE = {
  userId: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
  fetchGuestUser: () => Promise<void>;
};

export const useUserStore = create<TYPE_USER_STATE>()((set) => ({
  userId: null,
  username: null,
  isLoading: false,
  error: null,

  fetchGuestUser: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await createGuestUser();
      set({
        userId: res.data._id,
        username: res.data.username,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to create guest user", isLoading: false });
    }
  },
}));
