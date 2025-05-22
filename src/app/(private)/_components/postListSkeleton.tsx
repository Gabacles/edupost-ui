"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PostListSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      <Skeleton count={2} height={300} className="rounded-lg my-4" />
      <Skeleton count={2} height={300} className="rounded-lg my-4" />
    </div>
  );
};
