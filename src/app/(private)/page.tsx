import { Suspense } from "react";
import { PostList } from "./_components/postList";

export default function Home() {
  return (
    <main>
      <div className="justify-center items-center flex">
        <Suspense fallback={<div>Carregando lista de posts...</div>}>
          <PostList />
        </Suspense>
      </div>
    </main>
  );
}
