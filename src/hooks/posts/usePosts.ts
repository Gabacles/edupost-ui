"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "../useQueryParams";

export function usePosts() {
  const searchParams = useSearchParams();
  const keys = ["search", "page", "limit", "authorId"];
  const { buildQueryParams } = useQueryParams();

  const params: Record<string, string | null> = keys.reduce((acc: any, key) => {
    const value = searchParams.get(key);
    acc[key] = value;
    return acc;
  }, {});

  const queryString = buildQueryParams(keys) || "";
  const url = `/api/posts${queryString}`;

  return useQuery({
    queryKey: ["posts", { ...params }],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar posts");
      return res.json();
    },
  });
}
