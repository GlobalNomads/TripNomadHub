import Button from "@button/Button";
import PaginationArrowLeft from "@icon/ic_left.svg";
import PaginationArrowRight from "@icon/ic_right.svg";
import Image from "next/image";
import React, { useState } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // 보여줄 페이지 번호 버튼의 최대 개수 (모바일에서 5개로 제한)
  const maxVisibleButtons = 5;
  const [startPage, setStartPage] = useState(1);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // 현재 페이지에 따라 페이지 번호 슬라이딩 처리
  const getVisiblePageNumbers = () => {
    const endPage = startPage + maxVisibleButtons - 1;

    if (currentPage > endPage) {
      setStartPage(currentPage - maxVisibleButtons + 1);
    } else if (currentPage < startPage) {
      setStartPage(currentPage);
    }

    return Array.from(
      { length: Math.min(maxVisibleButtons, totalPages - startPage + 1) },
      (_, index) => startPage + index
    );
  };

  // 페이지네이션 버튼이 없을 때 표시하지 않음
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {/* 이전 페이지 버튼 */}
      <Button.Pagination
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type={currentPage === 1 ? "disabled" : "white"}
      >
        <Image src={PaginationArrowLeft} alt="Previous Page" width={24} height={24} />
      </Button.Pagination>

      {/* 페이지 번호 버튼 */}
      {getVisiblePageNumbers().map(page => (
        <Button.Pagination
          key={page}
          onClick={() => handlePageChange(page)}
          isActive={currentPage === page}
          type={currentPage === page ? "nomadBlack" : "white"}
        >
          {page}
        </Button.Pagination>
      ))}

      {/* 다음 페이지 버튼 */}
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
