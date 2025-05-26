"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import { Button } from "@/components/shared/button";
import { useUserStore } from "@/hooks/user/useUserStore";
import { useLogout } from "@/hooks/auth/useLogout";
import { LuCircleUser } from "react-icons/lu";

export const UserMenu = () => {
  const { getUserData, clearUserData } = useUserStore();
  const userData = getUserData();
  const { mutateAsync: logout, isPending } = useLogout();

  const [userName, setUserName] = useState<string | undefined>("");

  useEffect(() => {
    const user = getUserData();
    setUserName(user?.name);
  }, [getUserData]);

  const handleLogout = async () => {
    try {
      await logout();
      clearUserData();
      window.location.href = "/sign-in";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block">
            Olá, <strong className="text-edupost-blue">{userName}</strong>
          </span>
          <LuCircleUser
            size={30}
            className="hover:text-edupost-blue-primary transition-colors cursor-pointer"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuLabel className="text-center">
          {userData?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="w-full justify-start h-6"
            disabled={isPending}
            isLoading={isPending}
            onClick={handleLogout}
          >
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
