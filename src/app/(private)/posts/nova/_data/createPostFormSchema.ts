import z from "zod";

export const createPostFormSchema = z.object({
  title: z
    .string()
    .min(10, { message: "O título deve ter pelo menos 10 caracteres" })
    .max(100, { message: "O título deve ter no máximo 100 caracteres" }),
  content: z
    .string()
    .min(50, { message: "O conteúdo deve ter pelo menos 50 caracteres" })
    .max(5000, { message: "O conteúdo deve ter no máximo 5000 caracteres" }),
});

export type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;
