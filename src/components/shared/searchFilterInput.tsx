"use client";

import { Input } from "@/components/shared/input";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { cn } from "@/lib/utils";
import { Search, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HTMLAttributes, useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

interface SearchFilterInputProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}
export const SearchFilterInput = ({
  placeholder,
  className,
}: SearchFilterInputProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const { updateQuery } = useUpdateQueryParam();
  const search = params.get("search") || "";

  const [inputValue, setInputValue] = useState(search);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onChange = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
    setIsLoading(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      updateRouteParams(value);
      setIsLoading(false);
    }, 2000);
  };

  const cleanSearch = () => {
    updateRouteParams("");
    setIsLoading(false);
  };

  useEffect(() => {
    const searchParam = params.get("search");

    if (!searchParam) setInputValue("");
  }, [params]);

  const updateRouteParams = (searchedTerm: string) => {
    const newQuery = updateQuery("search", searchedTerm, ["page"]);
    router.push(newQuery);
  };

  return (
    <div
      className={cn(
        "hover:border-light-bg group relative flex w-full flex-row items-center md:w-[210px] lg:w-[350px]",
        className
      )}
    >
      <Input
        className="rounded-lg pr-10 text-mtx-xs placeholder:text-mtx-gray"
        title="search"
        placeholder={placeholder ?? "Buscar por título ou conteúdo"}
        value={inputValue}
        onChange={onChange}
        maxLength={50}
      />
      <div
        id="search-by-name-and-company"
        className={cn(
          "absolute inset-y-0 right-0 flex items-center pr-2",
          !search && "pointer-events-none "
        )}
      >
        {isLoading ? (
          <Loader className="mr-2 text-mtx-gray animate-spin" size={18} />
        ) : search ? (
          <X
            className="mr-2 text-mtx-gray cursor-pointer z-50"
            size={18}
            onClick={cleanSearch}
          />
        ) : (
          <Search className="mr-2 text-mtx-gray" size={18} />
        )}
      </div>
    </div>
  );
};
