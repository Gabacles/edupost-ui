"use client";

import Image from "next/image";
import Link from "next/link";
import EduPostLogo from "@/assets/edupost-logo.png";
import { UserMenu } from "./userMenu";

export const Header = () => {
  return (
    <div className="flex items-center justify-between w-full min-h-16 bg-white shadow-edu-shadow px-12 border border-b-edupost-blue-primary">
      <Link href="/" className="flex items-center">
        <Image src={EduPostLogo} alt="EduPost Logo" width={33} className="" />
        <span className="text-edupost-blue font-semibold hidden md:inline-block">edupost</span>
      </Link>

      <UserMenu />
    </div>
  );
};
