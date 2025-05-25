"use client";

import { useEffect, useState } from "react";
import { UserRoles } from "@/models/types/user";
import { CiSquarePlus } from "react-icons/ci";

import { useUserStore } from "@/hooks/user/useUserStore";
import { Button } from "@/components/shared/button";
import Link from "next/link";

export const NewPostButton = () => {
  const { getUserData } = useUserStore();
  const [userRole, setUserRole] = useState<UserRoles | undefined>();

  useEffect(() => {
    const user = getUserData();
    setUserRole(user?.roles);
  }, [getUserData]);

  if (userRole !== UserRoles.TEACHER) return null;

  return (
    <Button variant="link" className="pl-0">
      <Link
        href={`/posts/nova`}
        className="flex items-center gap-2 w-full"
      >
        <CiSquarePlus size={20} />
        Nova Postagem
      </Link>
    </Button>
  );
};
