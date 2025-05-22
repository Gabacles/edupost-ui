import z from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(25, { message: "A senha deve ter no máximo 25 caracteres" }),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
