import { useMutation } from "@tanstack/react-query";
import { Post } from "@/models/types/post";

export const useUpdatePostById = (id: number) => {
  return useMutation({
    mutationFn: async (data: Partial<Post>) => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Erro ao editar postagem");
      }

      return responseData;
    },
  });
};
