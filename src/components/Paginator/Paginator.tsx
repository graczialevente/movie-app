import React from "react";

type PaginatorProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Paginator({ page, totalPages, onPageChange }: PaginatorProps) {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== page) {
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showFirstPage = page > 3;
    const showLastPage = page < totalPages - 2;

    // Display first page button
    if (showFirstPage) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-8 rounded-lg bg-gray-200 py-2 text-xs font-medium text-gray-800 hover:bg-green-100 focus:outline-none focus:ring-4 focus:ring-green-600 sm:w-12  sm:py-2 sm:text-sm"
        >
          1
        </button>
      );
      pages.push(<span key="ellipsis-start">...</span>);
    }

    // Display page numbers before and after the current page
    for (
      let i = Math.max(1, page - 2);
      i <= Math.min(totalPages, page + 2);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-8 rounded-lg py-2 text-xs font-medium focus:outline-none focus:ring-4 sm:w-12 sm:py-2 sm:text-sm ${
            i === page
              ? "bg-green-500 text-white hover:bg-green-700 focus:ring-green-400"
              : "bg-gray-200 text-gray-800 hover:bg-green-100 focus:ring-green-600"
          }`}
        >
          {i}
        </button>
      );
    }

    // Display last page button
    if (showLastPage) {
      pages.push(<span key="ellipsis-end">...</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-8 rounded-lg bg-gray-200 py-2 text-xs font-medium text-gray-800 hover:bg-green-100 focus:outline-none focus:ring-4 focus:ring-green-600 sm:w-12  sm:py-2 sm:text-sm"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center gap-2 py-2">{renderPageNumbers()}</div>
  );
}
