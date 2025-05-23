import { Post } from "@/models/types/post";
import { Button } from "@/components/shared/button";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import Link from "next/link";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { title, content, author_id, createdAt, updatedAt, image } = post;
  const formattedDate = format(new Date(createdAt), "dd MMM yyyy - HH:mm", {
    locale: ptBR,
  });

  return (
    <Link
      href={`/posts/${post.id}`}
      className={`shadow-edu-shadow rounded-lg py-10 px-8 my-4 bg-edupost-blue hover:bg-edupost-blue-primary text-white relative flex flex-col gap-y-4 h-[300px] transition-colors`}
    >
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

      <div className="absolute max-sm:hidden top-2 right-2">
        <Image
          src={image}
          alt="Post Image"
          className="rounded-lg max-xl:w-40 max-lg:w-60 w-60 object-cover"
          priority
        />
      </div>

      <Button variant={"secondary"} className="sm:w-50 w-full max-w-[83%] absolute bottom-6">
        Mais sobre
      </Button>
    </Link>
  );
};
