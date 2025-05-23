import { IoMdArrowRoundBack } from "react-icons/io";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

interface BackButtonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BackButton = ({ className }: BackButtonProps) => {
  const router = useRouter();

  return (
    <button
      className={cn(
        className,
        "flex items-center gap-2 text-white transition-colors cursor-pointer"
      )}
      onClick={() => router.back()}
    >
      <IoMdArrowRoundBack size={20} />
      Voltar
    </button>
  );
};
