/*
  체험 후기(Activity Review)의 client 컴포넌트
*/
"use client";

import Pagination from "@/components/Pagination";
import { ReviewList } from "@/types/activities.type";
import getActivitiesIdRev from "@api/Activities/getActivitiesIdRev";
import star from "@icon/ic_star_on.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import Review from "./Review";

interface ActivityReviewClientProps {
  activityId: number;
}

const ActivityReviewClient: React.FC<ActivityReviewClientProps> = ({ activityId }) => {
  const [reviewsData, setReviewsData] = useState<{
    averageRating: number;
    totalCount: number;
    reviews: ReviewList[];
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getActivitiesIdRev(activityId, { page: currentPage });
      setReviewsData(data);
    };
    fetchReviews();
  }, [activityId, currentPage]);

  if (!reviewsData) {
    return <div>Loading reviews...</div>;
  }

  const getSatisfactionLabel = (rating: number): string => {
    if (rating >= 4) return "매우 만족🤗";
    if (rating >= 3) return "만족😊";
    if (rating >= 2) return "보통🙂";
    return "불만족😥";
  };

  const satisfactionLabel = getSatisfactionLabel(reviewsData.averageRating);

  return (
    <>
      <div className="text-xl-bold text-primary-black-100">후기</div>
      <div className="flex items-center rounded-lg border pb-6 pt-[18px]">
        <div className="mr-4 text-[50px] font-bold text-primary-black-100">{reviewsData.averageRating.toFixed(1)}</div>
        <div className="space-y-2">
          <div className="text-2lg-bold text-primary-black-100">{satisfactionLabel}</div>
          <div className="flex items-center space-x-1 text-gray-700">
            <Image src={star} alt="location" width={16} height={16} />
            <span className="text-md-regular text-primary-black-200">
              {reviewsData.totalCount.toLocaleString()}개 후기
            </span>
          </div>
        </div>
      </div>
      <div>
        {reviewsData.reviews.map((review, index) => (
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
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ActivityReviewClient;
