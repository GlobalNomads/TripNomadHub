import Button from "@button/Button";
import PaginationArrowLeft from "@icon/ic_left.svg";
import PaginationArrowRight from "@icon/ic_right.svg";
import Image from "next/image";
import React from "react";

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
      <Button.Pagination
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type={currentPage === 1 ? "disabled" : "white"}
      >
        <Image src={PaginationArrowLeft} alt="Previous Page" width={24} height={24} />
      </Button.Pagination>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button.Pagination
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          isActive={currentPage === index + 1}
          type={currentPage === index + 1 ? "nomadBlack" : "white"}
        >
          {index + 1}
        </Button.Pagination>
      ))}
      <Button.Pagination
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type={currentPage === totalPages ? "disabled" : "white"}
      >
        <Image src={PaginationArrowRight} alt="Next Page" width={24} height={24} />
      </Button.Pagination>
    </div>
  );
};

export default Pagination;
