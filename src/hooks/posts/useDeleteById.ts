import { useMutation } from "@tanstack/react-query";

export const useDeletePostById = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Error deleting post");
      }

      return responseData;
    },
  });
};
