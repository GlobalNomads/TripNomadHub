/*
    체험 상세 페이지 후기 컴포넌트
    TODO: API 연결(현재: MockData 연결됨). Pagination구현(TanStack Query 적용하면서 구현 예정)
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

const getSatisfactionLabel = (rating: number): string => {
  if (rating >= 4) return "매우 만족🤗";
  if (rating >= 3) return "만족😊";
  if (rating >= 2) return "보통🙂";
  return "불만족😥";
};

const ActivityReviews: FC<ReviewProps> = ({ averageRating = 0, totalCount = 0, reviews }) => {
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
        {reviews.map((review, index) => (
          <div key={review.id}>
            <Review key={review.id} review={review} />
            {index < reviews.length - 1 && <hr className="my-4 border-t border-primary-black-100 opacity-25" />}
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivityReviews;
