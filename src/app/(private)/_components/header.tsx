"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EduPostLogo from "@/assets/edupost-logo.png";
import { useUserStore } from "@/hooks/user/useUserStore";
import { LuCircleUser } from "react-icons/lu";

export const Header = () => {
  const { getUserData } = useUserStore();
  const [userName, setUserName] = useState<string | undefined>("");

  useEffect(() => {
    const user = getUserData();
    setUserName(user?.name);
  }, [getUserData]);

  return (
    <div className="flex items-center justify-between w-full min-h-16 bg-white shadow-edu-shadow px-12 border border-b-edupost-blue-primary">
      <Link href="/" className="flex items-center">
        <Image src={EduPostLogo} alt="EduPost Logo" width={33} className="" />
        <span className="text-edupost-blue font-semibold">edupost</span>
      </Link>

      <div className="flex items-center gap-2">
        <span>
          Olá, <strong className="text-edupost-blue">{userName}</strong>
        </span>
        <LuCircleUser size={30} />
      </div>
    </div>
  );
};
