/*
    체험 상세 페이지 후기 컴포넌트
    TODO: API 연결(현재: MockData 연결됨)
*/

import star from "@icon/ic_star_on.svg";
import Image from "next/image";
import { FC } from "react";
import Review from "./Review";

interface ReviewProps {
  averageRating?: number;
  totalCount: number;
  reviews: any[];
}

const ActivityReviews: FC<ReviewProps> = ({ averageRating = 0, totalCount = 0, reviews }) => {
  return (
    <>
      <div className="px-4 text-xl-bold text-primary-black-100">후기</div>
      <div className="flex items-center rounded-lg border px-4 pb-6 pt-[18px]">
        <div className="mr-4 text-[50px] font-bold text-primary-black-100">{averageRating.toFixed(1)}</div>
        <div>
          <div className="text-2lg-regular text-primary-black-100">매우 만족</div>
          <div className="flex items-center space-x-1 text-gray-700">
            <Image src={star} alt="location" width={16} height={16} />
            <span className="text-md-regular text-primary-black-200">{totalCount.toLocaleString()}개 후기</span>
          </div>
        </div>
      </div>
      <div>
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default ActivityReviews;
