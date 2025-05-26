import { Suspense } from "react";
import { PostList } from "./_components/postList";
import { PostListSkeleton } from "./_components/postListSkeleton";

export default function Home() {
  return (
    <main>
      <div className="justify-center items-center flex">
        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </div>
    </main>
  );
}
