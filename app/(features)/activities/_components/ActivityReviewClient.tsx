/*
  체험 후기(Activity Review)의 client 컴포넌트
*/
"use client";

import Pagination from "@/components/Pagination";
import { ReviewList } from "@/types/activities.type";
import star from "@icon/ic_star_on.svg";
import Image from "next/image";
import Review from "./Review";

interface ActivityReviewClientProps {
  averageRating: number;
  totalCount: number;
  reviews: ReviewList[];
  currentPage: number;
  totalPages: number;
  activityId: number;
}

const ActivityReviewClient: React.FC<ActivityReviewClientProps> = ({
  averageRating,
  totalCount,
  reviews,
  currentPage,
  totalPages,
  activityId,
}) => {
  const getSatisfactionLabel = (rating: number): string => {
    if (rating >= 4) return "매우 만족🤗";
    if (rating >= 3) return "만족😊";
    if (rating >= 2) return "보통🙂";
    return "불만족😥";
  };

  const satisfactionLabel = getSatisfactionLabel(averageRating);

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
        {reviews &&
          reviews.map((review, index) => (
            <div key={review.id}>
              <Review key={review.id} review={review} />
              {index < reviews.length - 1 && <hr className="my-4 border-t border-primary-black-100 opacity-25" />}
            </div>
          ))}
      </div>
      <div className="mt-10 md:mt-[90px] xl:mt-[72px]">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={page => `/activities/${activityId}/reviews?page=${page}`}
        />
      </div>
    </>
  );
};

export default ActivityReviewClient;
