/*
    체험 상세 페이지 후기 컴포넌트
    TODO: API 연결(현재: MockData 연결됨)
*/

import { FC } from "react";
import Review from "./Review";

const ActivityReviews: FC<{ reviews: any[] }> = ({ reviews }) => {
  return (
    <>
      <div>후기</div>
      <div>4.2 매우만족 별, 1300개 후기</div>
      <div>
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default ActivityReviews;
