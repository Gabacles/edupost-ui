"use client";

import { Button } from "@/components/shared/button";
import { FormInput } from "@/components/shared/formInput";
import { Textarea } from "@/components/shared/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPostFormSchema,
  type CreatePostFormSchema,
} from "../_data/createPostFormSchema";

import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

export const CreatePostForm = () => {
  const { mutateAsync, isPending } = useCreatePost();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreatePostFormSchema) => {
    try {
      const { title, content } = data;

      const postData = {
        title,
        content,
      };

      await mutateAsync(postData);

      toast.success("Postagem criada com sucesso!");

      router.push("/");
    } catch (error) {
      toast.error("Erro ao criar postagem");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <FormInput
        name="title"
        label="Título"
        type="text"
        placeholder="Título da postagem"
        registration={register("title")}
        error={errors.title}
      />
      <div>
        <label htmlFor="content" className="block mb-1 font-medium">
          Conteúdo
        </label>
        <Textarea
          id="content"
          placeholder="Conteúdo da postagem"
          className={cn("h-40", errors.content && "border-red-500")}
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition duration-200"
        disabled={isPending}
        isLoading={isPending}
      >
        Criar Postagem
      </Button>
    </form>
  );
};
