/*
    체험 상세 페이지 후기 컴포넌트
*/

import Pagination from "@/components/Pagination";
import { ActivitiesReviewData } from "@/types/activities.type";
import star from "@icon/ic_star_on.svg";
import Image from "next/image";
import { FC, useState } from "react";
import Review from "./Review";

const getSatisfactionLabel = (rating: number): string => {
  if (rating >= 4) return "매우 만족🤗";
  if (rating >= 3) return "만족😊";
  if (rating >= 2) return "보통🙂";
  return "불만족😥";
};

const ActivityReviews: FC<ActivitiesReviewData> = ({ averageRating = 0, totalCount = 0, reviews }) => {
  const satisfactionLabel = getSatisfactionLabel(averageRating);

  // 상태 추가: 현재 페이지와 페이지 당 리뷰 수
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // 한 페이지에 표시할 리뷰 수

  // 현재 페이지에 표시할 리뷰 계산
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // 페이지 변경 함수 정의
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="text-xl-bold text-primary-black-100">후기</div>
      <div className="flex items-center rounded-lg border pb-6 pt-[18px]">
        <div className="mr-4 text-[50px] font-bold text-primary-black-100">{averageRating.toFixed(1)}</div>
        <div className="space-y-2">
          <div className="text-2lg-bold text-primary-black-100">{satisfactionLabel}</div>
          <div className="flex items-center space-x-1 text-gray-700">
            <Image src={star} alt="location" width={16} height={16} />
            <span className="text-md-regular text-primary-black-200">{totalCount.toLocaleString()}개 후기</span>
          </div>
        </div>
      </div>
      <div>
        {currentReviews.map((review, index) => (
          <div key={review.id}>
            <Review key={review.id} review={review} />
            {index < currentReviews.length - 1 && <hr className="my-4 border-t border-primary-black-100 opacity-25" />}
          </div>
        ))}
      </div>
      <div className="mt-10 md:mt-[90px] xl:mt-[72px]">
        <Pagination
          totalPages={Math.ceil(reviews.length / reviewsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ActivityReviews;
