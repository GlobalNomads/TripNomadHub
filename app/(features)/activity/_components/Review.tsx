/*
    후기 컴포넌트
*/

import { ReviewList } from "@/types/activities.type";
import defaultProfile from "@icon/ic_default_reviewprofile.png";
import Image from "next/image";
import { FC } from "react";

const Review: FC<{ review: ReviewList }> = ({ review }) => {
  const profileImageUrl = review.user.profileImageUrl || defaultProfile.src; // 기본 이미지 경로 설정

  return (
    <div className="flex rounded-lg border">
      <div className="mr-4 flex-shrink-0">
        <div className="relative h-[45px] w-[45px] overflow-hidden rounded-full">
          <Image
            src={profileImageUrl}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            alt={review.user.nickname}
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="flex-grow">
        <div className="mb-2 flex items-baseline">
          <div className="text-lg-semibold text-primary-black-100">{review.user.nickname}</div>
          <div className="mx-2 text-primary-black-100">|</div>
          <div className="whitespace-nowrap text-lg-regular text-primary-gray-600">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-2 text-lg-regular text-primary-black-100">{review.content}</div>
      </div>
    </div>
  );
};

export default Review;
