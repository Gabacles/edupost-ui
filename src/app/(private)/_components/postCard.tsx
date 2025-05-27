"use client";

import { useState } from "react";
import { Post } from "@/models/types/post";
import { Button } from "@/components/shared/button";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Link from "next/link";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ManagePostsMenu } from "./managePostsMenu";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  refetchPosts: () => void;
}

export const PostCard = ({ post, refetchPosts }: PostCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { title, content, author_id, createdAt, image } = post;
  const formattedDate = format(new Date(createdAt), "dd MMM yyyy - HH:mm", {
    locale: ptBR,
  });

  return (
    <Link
      href={`/posts/${post.id}`}
      className={`shadow-edu-shadow rounded-lg py-10 px-8 my-4 bg-edupost-blue hover:bg-edupost-blue-primary text-white relative flex flex-col gap-y-4 h-[300px] transition-colors`}
    >
      <div className="absolute top-2 right-2 z-20">
        <ManagePostsMenu post={post} refetchPosts={refetchPosts} />
      </div>
      <h2 className="text-3xl font-bold sm:max-w-1/2 line-clamp-2">{title}</h2>
      <p className="sm:max-w-1/2 line-clamp-2">{content}</p>

      <div>
        <div className="flex items-center gap-2">
          <FaUserGraduate className="inline-block" />
          <span className="text-sm">{author_id.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarAlt className="inline-block" />
          <span className="">{formattedDate}h</span>
        </div>
      </div>

      <div className="absolute max-sm:hidden top-6 right-7">
        {isLoading && (
          <div className="absolute rounded inset-0 animate-pulse bg-gray-500" />
        )}
        <Image
          src={image}
          alt="Post Image"
          className={cn(
            "rounded-lg max-xl:w-40 max-lg:w-60 w-60 object-cover transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          priority
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>

      <Button
        variant={"secondary"}
        className="sm:w-50 w-full max-w-[83%] absolute bottom-6"
      >
        Mais sobre
      </Button>
    </Link>
  );
};
