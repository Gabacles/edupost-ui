"use client";

import { useQuery } from "@tanstack/react-query";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error("Erro ao buscar posts");
      return res.json();
    },
  });
}
