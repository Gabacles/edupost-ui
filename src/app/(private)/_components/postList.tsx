"use client";

import { Post } from "@/models/types/post";
import { PostCard } from "./postCard";
import { usePosts } from "@/hooks/posts/usePosts";
import { randomImages } from "@/styles/randomImages";
import { SearchFilterInput } from "@/components/shared/searchFilterInput";
import { PostListSkeleton } from "./postListSkeleton";
import { PostNotFound } from "./postNotFound";
import { AuthorOnlySwitch } from "./authorOnlySwitch";
import { ListPagination } from "./pagination/listPagination";
import { ItemsPerPage } from "./pagination/itemsPerPage";
import { NewPostButton } from "../posts/nova/_components/newPostButton";

export const PostList = () => {
  const { data, isLoading } = usePosts();
  const posts: Post[] = data?.data || [];
  const totalPages = data?.totalPages || 0;

  const postsWithImages = posts.map((post) => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return {
      ...post,
      image: randomImages[randomIndex],
    };
  });

  return (
    <div className="w-[80%] min-w-96 my-6">
      <div className="flex justify-between mb-4">
        <NewPostButton />
        <ItemsPerPage />
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <SearchFilterInput />
        <AuthorOnlySwitch />
      </div>
      {isLoading ? (
        <PostListSkeleton />
      ) : !posts.length ? (
        <PostNotFound />
      ) : (
        <>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
            {postsWithImages.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex items-center justify-center mt-6">
            <ListPagination totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
};
