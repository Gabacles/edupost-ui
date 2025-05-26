import { UserRoles } from "@/models/types/user";
import { User } from "@/models/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  userData?: User;
  hasHydrated: boolean;
  setUserData: (userData: User) => void;
  getUserData: () => User | undefined;
  getUserRole: () => UserRoles | null;
  clearUserData: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      userData: undefined,
      hasHydrated: false,
      setUserData: (userData: User) => set(() => ({ userData })),
      getUserData: () => get().userData,
      getUserRole: () => {
        const user = get().userData;
        return user ? user.roles : null;
      },
      clearUserData: () => {
        useUserStore.persist.clearStorage();
      },
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: "user-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
