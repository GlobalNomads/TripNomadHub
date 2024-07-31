/*
    후기 컴포넌트
*/

import { FC } from "react";

const Review: FC<{ review: any }> = ({ review }) => {
  return (
    <>
      <div>
        <img src={review.user.profileImageUrl} alt={review.user.nickname} />
        <div>{review.user.nickname}</div>
        <div>{new Date(review.createdAt).toLocaleDateString()}</div>
        <div>{review.content}</div>
      </div>
    </>
  );
};

export default Review;
