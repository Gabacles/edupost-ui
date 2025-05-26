import { UserRoles } from "@/models/types/user";
import { User } from "@/models/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IUserStore {
  userData?: User;
  setUserData: (userData: User) => void;
  getUserData: () => User | undefined;
  getUserRole: () => UserRoles | null;
  clearUserData: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      setUserData: (userData: User) => set(() => ({ userData })),
      getUserData: () => {
        return get().userData;
      },
      getUserRole: () => {
        const user = get().userData;
        return user ? user.roles : null;
      },
      clearUserData: () => {
        useUserStore.persist.clearStorage();
      },
    }),
    {
      name: "user-storage",
    }
  )
);
