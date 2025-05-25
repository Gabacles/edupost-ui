import { useQuery } from "@tanstack/react-query";

export function useGetPostById(postId: string) {
  const url = `/api/posts/${postId}`;

  return useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Erro ao buscar post");
      return res.json();
    },
  });
}
