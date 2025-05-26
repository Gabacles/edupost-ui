"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PostDetailsSkeleton = () => {
  return (
    <div className="w-full pb-20">
      <div className="bg-edupost-blue w-full grid md:grid-cols-2 grid-cols-1 items-center px-[10%] p-16 mb-4 relative">
        <div className="flex flex-col gap-4 max-md:text-center">
          <Skeleton count={1} height={50} width="80%" className="mb-4" />
          <Skeleton count={1} height={30} width="60%" className="mb-2" />
          <Skeleton count={1} height={30} width="40%" />
        </div>
        <div className="w-full flex justify-end max-md:hidden">
          <Skeleton circle width={100} height={100} />
        </div>
      </div>
      <div className="px-[10%]">
        <Skeleton count={5} height={20} className="my-2" />
      </div>
    </div>
  );
};
