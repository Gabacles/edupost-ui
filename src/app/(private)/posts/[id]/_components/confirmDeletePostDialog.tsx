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
import { useDeletePostById } from "@/hooks/posts/useDeleteById";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ConfirmDeletePostDialogProps {
  post: Post;
  refetchPosts: () => void;
}

export const ConfirmDeletePostDialog = ({
  post,
  refetchPosts,
}: ConfirmDeletePostDialogProps) => {
  const { title: postTitle, id: postId } = post;

  const { mutateAsync, isPending } = useDeletePostById(postId);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await mutateAsync();
      refetchPosts();
      toast.success("Postagem deletada com sucesso");

      router.push("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Erro ao deletar postagem");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-1/2 max-w-[250px] ml-4">
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent className="max-md:h-screen max-md:!max-w-screen max-md:rounded-none flex flex-col">
        <DialogHeader>
          <DialogTitle className="!text-xl mb-4">Tem certeza?</DialogTitle>
          <DialogDescription className="md:gap-4 gap-10 flex flex-col text-lg">
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a
            postagem com o título:
            <span className="font-bold !text-lg">{`"${postTitle}"`}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center max-md:fixed max-md:bottom-0 max-md:gap-2 w-full max-md:mb-20">
          <Button
            variant="outline"
            className="w-1/3 max-md:w-full"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="w-1/3 max-md:w-full"
            disabled={isPending}
            isLoading={isPending}
            onClick={handleDelete}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
