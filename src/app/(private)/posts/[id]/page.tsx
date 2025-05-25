"use client";

import { use } from "react";
import { useGetPostById } from "@/hooks/posts/useGetPostById";
import { randomImages } from "@/styles/randomImages";
import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { BackButton } from "@/components/shared/backButton";
import { useUserStore } from "@/hooks/user/useUserStore";
import { EditPostDialog } from "./_components/editPostDialog";
import { ConfirmDeletePostDialog } from "./_components/confirmDeletePostDialog";

const PostDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data, isLoading, error, refetch } = useGetPostById(id);
  const { getUserData } = useUserStore();
  const userData = getUserData();
  const canEditPost = userData?.id === data?.author_id.id;
  if (isLoading) return <div>Loading...</div>;

  const randomIndex = Math.floor(Math.random() * randomImages.length);
  const randomImage = randomImages[randomIndex];

  const { title, content, createdAt, author_id } = data || {};

  const formattedDate = format(new Date(createdAt), "dd MMM yyyy - HH:mm", {
    locale: ptBR,
  });

  return (
    <div className="w-full">
      <div className="bg-edupost-blue w-full grid md:grid-cols-2 grid-cols-1 items-center px-[10%] p-16 mb-4 relative">
        <BackButton className="absolute left-5 top-5" />
        <div className="flex flex-col gap-4 max-md:text-center">
          <h1 className="text-white xl:text-6xl text-3xl font-bold">{title}</h1>

          <div className="flex items-center gap-2 text-white max-md:justify-center">
            <FaUserGraduate className="inline-block" />
            <span className="text-white text-lg">Prof: {author_id.name}</span>
          </div>

          <div className="flex items-center gap-2 text-white max-md:justify-center">
            <FaRegCalendarAlt className="inline-block" />
            <span className="text-lg">{formattedDate}h</span>
          </div>
        </div>
        <div className="w-full flex justify-end max-md:hidden">
          <Image
            src={randomImage}
            alt="Post Image"
            className="rounded-lg w-84 object-cover"
            priority
          />
        </div>
      </div>

      <p className="px-[10%] lg:text-2xl text-lg mt-10">{content}</p>

      {canEditPost && (
        <div className="flex justify-center my-20">
          <EditPostDialog post={data} refetchPosts={refetch} />

          <ConfirmDeletePostDialog post={data} refetchPosts={refetch} />
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;
