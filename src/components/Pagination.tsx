import React, { useEffect } from "react";

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  type?: string;
}

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
  type,
}: PaginationProps) {
  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    const totalNumbers = 5;
    const halfTotalNumbers = Math.floor(totalNumbers / 2);

    let startPage = Math.max(2, currentPage - halfTotalNumbers);
    let endPage = Math.min(pagesCount - 1, currentPage + halfTotalNumbers);

    if (currentPage <= halfTotalNumbers) {
      endPage = Math.min(totalNumbers, pagesCount - 1);
    } else if (currentPage + halfTotalNumbers >= pagesCount) {
      startPage = Math.max(pagesCount - totalNumbers + 1, 2);
    }

    return pages.slice(startPage - 1, endPage).map((page) => (
      <li key={page}>
        <a
          className={`${
            page === currentPage ? "text-blue" : "text-white"
          } text-lg px-3 py-2 bg-purple rounded-lg cursor-pointer`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </a>
      </li>
    ));
  };

  return (
    <div onLoadStart={() => console.log("21331")}>
      <ul className="flex gap-5 items-center justify-center font-bold">
        <li>
          <button
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "text-label" : "text-white"
            } text-lg px-3 py-2 bg-purple rounded-lg cursor-pointer`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Back
          </button>
        </li>

        <li>
          <a
            className={`${
              currentPage === 1 ? "text-blue" : "text-white"
            } text-lg px-3 py-2 bg-purple rounded-lg cursor-pointer`}
            onClick={() => onPageChange(1)}
          >
            1
          </a>
        </li>

        {currentPage > 3 && pagesCount > 5 && (
          <li className="text-lg px-3 py-2 text-white">...</li>
        )}

        {renderPageNumbers()}

        {currentPage < pagesCount - 2 && pagesCount > 5 && (
          <li className="text-lg px-3 py-2 text-white">...</li>
        )}

        {pagesCount > 1 && (
          <li>
            <a
              className={`${
                currentPage === pagesCount ? "text-blue" : "text-white"
              } text-lg px-3 py-2 bg-purple rounded-lg cursor-pointer`}
              onClick={() => onPageChange(pagesCount)}
            >
              {pagesCount}
            </a>
          </li>
        )}

        <li>
          <button
            disabled={currentPage === pagesCount}
            className={`${
              currentPage === pagesCount ? "text-label" : "text-white"
            } text-lg px-3 py-2 bg-purple rounded-lg cursor-pointer`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
