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
  // 페이지 변경을 처리하는 함수
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      // 페이지가 1 이상이고 총 페이지 수 이내인지 확인
      onPageChange(page); // 유효한 경우 페이지 변경 함수 호출
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Button.Pagination
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        type={currentPage === 1 ? "disabled" : "white"}
      >
        <Image src={PaginationArrowLeft} alt="Previous Page" width={24} height={24} /> {/* 왼쪽 화살표 아이콘 */}
      </Button.Pagination>
      {Array.from(
        { length: totalPages },
        (
          _,
          index, // 총 페이지 수만큼 배열 생성 후 각 페이지 버튼 생성
        ) => (
          <Button.Pagination
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            isActive={currentPage === index + 1}
            type={currentPage === index + 1 ? "nomadBlack" : "white"}
          >
            {index + 1}
          </Button.Pagination>
        ),
      )}
      <Button.Pagination
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        type={currentPage === totalPages ? "disabled" : "white"}
      >
        <Image src={PaginationArrowRight} alt="Next Page" width={24} height={24} /> {/* 오른쪽 화살표 아이콘 */}
      </Button.Pagination>
    </div>
  );
};

export default Pagination;
