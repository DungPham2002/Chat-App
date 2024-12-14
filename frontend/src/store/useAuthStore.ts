import { create } from "zustand";
import { User } from "../types/interfaces/user.interace";
import { authApi } from "../services";
import toast from "react-hot-toast";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IAuthStore {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
}

export interface IAuthAction {
  updateAuthProfile: (user: IAuthStore["user"]) => void;
  logout: () => void;
  signup: (data: any) => void;
  login: (data: any) => void;
}

export const useAuthStore = create<IAuthStore & { actions: IAuthAction }>()(
  persist(
    (set) => ({
      isInitialized: false,
      isAuthenticated: false,
      user: null,

      actions: {
        updateAuthProfile: (user: IAuthStore["user"]) =>
          set({ isAuthenticated: true, user }),
        logout: async () => {
          try {
            await authApi.logout();
            set({ isAuthenticated: false, user: null });
            toast.success("Logged out successfully!");
          } catch (error) {}
        },
        signup: async (data: any) => {
          try {
            const res = await authApi.signup(data);
            set({ isAuthenticated: true, user: res.user });
            toast.success("Account created successfully!");
          } catch (error: any) {
            toast.error(error.response.data.message);
          }
        },
        login: async (data: any) => {
          try {
            const res = await authApi.login(data);
            set({ isAuthenticated: true, user: res.user });

            toast.success("Login successfully!");
          } catch (error: any) {
            toast.error(error.response.data.message);
          }
        },
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ isInitialized, isAuthenticated, user }) => ({
        isInitialized,
        isAuthenticated,
        user,
      }),
    }
  )
);
