import { useMutation } from "@tanstack/react-query";
import { Post } from "@/models/types/post";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (data: Partial<Post>) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Erro ao criar postagem");
      }

      return responseData;
    },
  });
};
