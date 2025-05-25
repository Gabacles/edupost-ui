"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Button } from "@/components/shared/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useUpdateQueryParam } from "@/hooks/useUpdateQueryParam";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface ListPaginationProps {
  totalPages: number;
}

const ListPagination = memo(({ totalPages }: ListPaginationProps) => {
  const router = useRouter();
  const { updateQuery } = useUpdateQueryParam();
  const params = useSearchParams();

  const currentPage = +(params.get("page") || "1");

  const handleOnClickPreviousPage = () => {
    goToPage(currentPage - 1);
  };

  const handleOnClickNextPage = () => {
    goToPage(currentPage + 1);
  };

  const handleOnClickGoToPage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const page = event.currentTarget.value;

    if (page === "...") return;

    goToPage(+page);
  };

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    if (page === currentPage) return;

    const newQuery = updateQuery("page", page.toString());

    router.push(newQuery);
  };

  const { floor, min, max } = Math;
  const range = (lo: number, hi: number) =>
    Array.from({ length: hi - lo }, (_, i) => i + lo);

  const pagination = () => {
    const items = 5;

    const start = max(
      1,
      min(currentPage - floor((items - 3) / 2), totalPages - items + 2)
    );
    const end = min(
      totalPages,
      max(currentPage + floor((items - 2) / 2), items - 1)
    );
    return [
      ...(start > 2 ? [1, "..."] : start > 1 ? [1] : []),
      ...range(start, end + 1),
      ...(end < totalPages - 1
        ? ["...", totalPages]
        : end < totalPages
        ? [totalPages]
        : []),
    ];
  };

  const buildPageButtons = () => {
    const pages = [];
    const options = pagination();

    for (const option of options) {
      const isCurrentPage = +option === currentPage;

      pages.push(
        <Button
          key={`${option}-page-button`}
          id={`${option}-page-button`}
          value={option}
          variant="outline"
          className={cn(
            "h-8 w-8 p-0",
            isCurrentPage && "border border-mtx-black bg-mtx-white"
          )}
          onClick={handleOnClickGoToPage}
        >
          {option}
        </Button>
      );
    }

    return pages;
  };

  if (totalPages <= 0) return <></>;

  return (
    <div className="mb-6 mt-6 flex items-center justify-center px-2">
      <div className="flex items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Button
            id="previous-page-button"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleOnClickPreviousPage}
          >
            <span className="sr-only">Anterior</span>
            <IoIosArrowBack className="h-4 w-4" />
          </Button>

          {buildPageButtons()}

          <Button
            id="next-page-button"
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleOnClickNextPage}
          >
            <span className="sr-only">Próxima</span>
            <IoIosArrowForward className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
ListPagination.displayName = "ListPagination";
export { ListPagination };
