/*
 * 체험 후기(Activity Review)의 client 컴포넌트
 * 첫 번째 페이지의 리뷰 데이터는 서버 컴포넌트(ActivityPage)에서 받아오고,
 * 이후 페이지의 데이터는 클라이언트에서 가져와서 페이지네이션을 처리합니다.
 */
"use client";

import Pagination from "@/components/Pagination";
import { ReviewList } from "@/types/activities.type";
import star from "@icon/ic_star_on.svg";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import Review from "./Review";

const fetchReviews = async (activityId: number, page: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}activities/${activityId}/reviews?page=${page}&size=3`, {
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("리뷰 불러오기를 실패했습니다.");
  }

  return res.json();
};

const ActivityReviewClient: React.FC<{
  initialReviews: { averageRating: number; totalCount: number; reviews: ReviewList[] };
  activityId: number;
}> = ({ initialReviews, activityId }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: reviewsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", activityId, currentPage],
    queryFn: () => fetchReviews(activityId, currentPage),
    placeholderData: currentPage === 1 ? initialReviews : keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getSatisfactionLabel = (rating: number, totalCount: number): string => {
    if (totalCount === 0) return "🌷 첫 번째 리뷰를 작성해 주세요!";
    if (rating >= 4) return "매우 만족🤗";
    if (rating >= 3) return "만족😊";
    if (rating >= 2) return "보통🙂";
    return "불만족😥";
  };

  const satisfactionLabel = getSatisfactionLabel(reviewsData?.averageRating || 0, reviewsData?.totalCount || 0);

  if (isLoading) {
    return <div>리뷰 목록 로딩 중...🏃‍♀️🏃‍♂️</div>;
  }

  if (error) {
    return <div>리뷰를 불러오지 못했습니다. 나중에 다시 시도해 주세요.</div>;
  }

  return (
    <>
      <div className="text-xl-bold text-primary-black-100">후기</div>
      <div className="flex items-center rounded-lg border pb-6 pt-[18px]">
        <div className="mr-4 text-[50px] font-bold text-primary-black-100">{reviewsData.averageRating.toFixed(1)}</div>
        <div className="space-y-2">
          <div className="text-2lg-bold text-primary-black-100">{satisfactionLabel}</div>
          <div className="flex items-center space-x-1 text-gray-700">
            <Image src={star} alt="rating star" width={16} height={16} />
            <span className="text-md-regular text-primary-black-200">
              {reviewsData.totalCount.toLocaleString()}개 후기
            </span>
          </div>
        </div>
      </div>
      <div>
        {reviewsData.reviews.map((review: ReviewList, index: number) => (
          <div key={review.id}>
            <Review review={review} />
            {index < reviewsData.reviews.length - 1 && (
              <hr className="my-4 border-t border-primary-black-100 opacity-25" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 md:mt-[90px] xl:mt-[72px]">
        <Pagination
          totalPages={Math.ceil(reviewsData.totalCount / 3)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ActivityReviewClient;
