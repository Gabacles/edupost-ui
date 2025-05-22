import { memo } from "react";
import Image from "next/image";
import EduPostLogoImg from "@/assets/edupost-logo.png";

export const EdupostLogo = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src={EduPostLogoImg}
        alt="Edupost Logo"
        height={300}
        priority
      />
      <span className="text-7xl font-bold text-edupost-blue">EduPost</span>
    </div>
  );
});
