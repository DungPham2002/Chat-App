import { useAuthStore } from "./useAuthStore";

export const useSelectAuthActions = () =>
  useAuthStore((state) => state.actions);

export const useSelectAuthIsInitialized = () =>
  useAuthStore((state) => state.isInitialized);

export const useSelectAuthIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);

export const useSelectAuthUser = () => useAuthStore((state) => state.user);
