"use client";

import { useState } from "react";
import { Post } from "@/models/types/post";
import { Button } from "@/components/shared/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shared/dialog";
import { FormInput } from "@/components/shared/formInput";
import { Textarea } from "@/components/shared/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editPostFormSchema,
  type EditPostFormSchema,
} from "../_data/editPostFormSchema";

import { useUpdatePostById } from "@/hooks/posts/usePatchPostById";
import { toast } from "react-toastify";

interface EditPostDialogProps {
  post: Post;
  refetchPosts: () => void;
}

export const EditPostDialog = ({ post, refetchPosts }: EditPostDialogProps) => {
  const { title, content, id } = post;
  const { mutateAsync } = useUpdatePostById(id);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPostFormSchema>({
    resolver: zodResolver(editPostFormSchema),
    mode: "onChange",
    defaultValues: {
      title,
      content,
    },
  });

  const onSubmit = async (data: EditPostFormSchema) => {
    try {
      const { title, content } = data;

      const postData = {
        title,
        content,
      };

      await mutateAsync(postData);

      refetchPosts();

      toast.success("Postagem editada com sucesso!");
      setOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Erro ao editar postagem");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-1/2 max-w-[250px]">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:h-screen max-md:!max-w-screen max-md:rounded-none flex flex-col ">
        <DialogHeader>
          <DialogTitle className="text-edupost-blue-primary font-bold">
            Editar Postagem
          </DialogTitle>
          <DialogDescription>
            Edite os dados da postagem abaixo.
          </DialogDescription>
        </DialogHeader>

        <hr className="border border-b-edupost-blue-primary max-md:hidden" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <FormInput
            label="Título"
            name="title"
            type="text"
            placeholder="Título da postagem"
            error={errors.title}
            registration={register("title")}
          />

          <div className="!">
            <label htmlFor="content" className="block mb-1 font-medium">
              Conteúdo
            </label>
            <Textarea
              id="content"
              placeholder="Conteúdo da postagem"
              className="h-40 md:max-w-[460px]"
              {...register("content")}
            />
          </div>

          <DialogFooter className="flex justify-center max-md:fixed max-md:bottom-0 max-md:gap-2 w-full max-md:mb-20">
            <Button
              type="button"
              variant="outline"
              className="w-1/3 max-md:w-full"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-1/3 max-md:w-full">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
