"use client";

import { Post } from "@/models/types/post";
import { PostCard } from "./postCard";
import { usePosts } from "@/hooks/posts/usePosts";
import { randomImages } from "@/styles/randomImages";
import { SearchFilterInput } from "@/components/shared/searchFilterInput";
import { PostListSkeleton } from "./postListSkeleton";
import { PostNotFound } from "./postNotFound";

export const PostList = () => {
  const { data, isLoading, error } = usePosts();
  const res: Post[] = data || [];

  const postsWithImages = res.map((post) => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return {
      ...post,
      image: randomImages[randomIndex],
    };
  });

  return (
    <div className="w-[80%] min-w-96 my-6">
      <SearchFilterInput />
      {isLoading ? (
        <PostListSkeleton />
      ) : !data.length ? (
        <PostNotFound />
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4">
          {postsWithImages.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
