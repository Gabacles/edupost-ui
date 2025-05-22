import { useMutation } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Erro ao fazer login");
      }

      return responseData;
    },
  });
}
