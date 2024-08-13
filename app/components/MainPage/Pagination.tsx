import React from "react";
import Image from "next/image";
import PaginationArrowLeft from "@icon/ic_left.svg"
import PaginationArrowRight from "@icon/ic_right.svg"

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src={PaginationArrowLeft} alt="Previous" width={24} height={24} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            currentPage === index + 1 ? "bg-green-800 text-white" : "border border-green-800 text-green-800"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src={PaginationArrowRight} alt="Next" width={24} height={24} />
      </button>
    </div>
  );
};

export default Pagination;
