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
import { cn } from "@/lib/utils";
import { FaTrashAlt } from "react-icons/fa";

interface ConfirmDeletePostDialogProps {
  post: Post;
  refetchPosts?: () => void;
  renderAsButton?: boolean;
}

export const ConfirmDeletePostDialog = ({
  post,
  refetchPosts,
  renderAsButton = true,
}: ConfirmDeletePostDialogProps) => {
  const { title: postTitle, id: postId } = post;

  const { mutateAsync, isPending } = useDeletePostById(postId);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await mutateAsync();

      if (refetchPosts) refetchPosts();

      toast.success("Postagem deletada com sucesso");

      if (renderAsButton) router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Erro ao deletar postagem");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={renderAsButton ? "destructive" : "ghost"}
          className={cn(
            "sm:w-1/2 sm:max-w-[250px] sm:ml-4",
            !renderAsButton && "!w-full !ml-0 justify-between"
          )}
        >
          Excluir
          {!renderAsButton && <FaTrashAlt />}
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
