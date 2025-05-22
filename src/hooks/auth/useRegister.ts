import { useMutation } from "@tanstack/react-query";
import { User } from "@/models/types/user";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: Partial<User>) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Erro ao fazer registro");
      }

      return responseData;
    },
  });
};
