import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";

import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { useState } from "react";

export const ItemsPerPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { updateQuery } = useUpdateQueryParam();
  const [selectedSize, setSelectedSize] = useState(params.get("limit") || "4");

  const handleSizeChange = (limit: string) => {
    setSelectedSize(limit);
    const newQuery = updateQuery("limit", limit, ["page"]);
    router.push(newQuery);
  };

  return (
    <Select
      onValueChange={(value: string) => handleSizeChange(value)}
      value={selectedSize}
    >
      <SelectTrigger className="w-[215px] rounded-lg text-mtx-xs">
        <SelectValue>{`${selectedSize} itens por página`}</SelectValue>
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;

          ref.addEventListener(
            "touchstart",
            (e) => {
              if (e.target === ref) {
                e.preventDefault();
              }
            },
            { passive: false }
          );
        }}
        side="top"
      >
        {["4", "12", "30", "50", "80", "100"].map((pageSize) => (
          <SelectItem key={pageSize} value={pageSize}>
            {`${pageSize} itens por página`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
