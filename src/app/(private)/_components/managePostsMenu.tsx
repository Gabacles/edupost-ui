"use client";

import { Post } from "@/models/types/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";

import { EditPostDialog } from "../posts/[id]/_components/editPostDialog";
import { ConfirmDeletePostDialog } from "../posts/[id]/_components/confirmDeletePostDialog";
import { BsGear } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useUserStore } from "@/hooks/user/useUserStore";

interface ManagePostsMenuProps {
  post: Post;
  refetchPosts: () => void;
}

export const ManagePostsMenu = ({
  post,
  refetchPosts,
}: ManagePostsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [authorId, setAuthorId] = useState<number | undefined>();
  const { getUserData } = useUserStore();

  useEffect(() => {
    const user = getUserData();
    setAuthorId(user?.id);
  }, [getUserData]);

  const handleRefetch = () => {
    refetchPosts();
    setIsOpen(false);
  };

  if (authorId !== post.author_id.id) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <BsGear size={20} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuLabel className="text-center">
          Gerenciar Post
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditPostDialog
          post={post}
          renderAsButton={false}
          refetchPosts={handleRefetch}
        />
        <ConfirmDeletePostDialog
          post={post}
          renderAsButton={false}
          refetchPosts={handleRefetch}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
