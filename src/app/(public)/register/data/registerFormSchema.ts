import z from "zod";
import { UserRoles } from "@/models/types/user";

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
      .max(25, { message: "A senha deve ter no máximo 25 caracteres" }),
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    role: z.enum([UserRoles.STUDENT, UserRoles.TEACHER], {
      errorMap: () => ({ message: "Opção inválida" }),
    }),
    confirmPassword: z
      .string()
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
