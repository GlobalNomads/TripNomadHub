"use client";

/*
  체험 상세 페이지
  Todo: 
    (1)카카오 지도 연결,
    (2)예약 관리,
    (3)MockData 없애고 실제 API와 데이터 연결하기
*/

import { useEffect, useState } from "react";
import ActivityDescription from "../_components/ActivityDescription";
import ActivityImageGallery from "../_components/ActivityImageGallery";
import ActivityReviews from "../_components/ActivityReviews";
import ActivityTitle from "../_components/ActivityTitle";
import DropDownMenu from "../_components/DropDownMenu";
import ReservationFloatingBox from "../_components/ReservationFloatingBox";
import { activityData, reviewData } from "../mockData";

interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

interface Review {
  id: number;
  user: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Reviews {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

interface ActivityPageProps {
  params: { activityId: string };
}

async function getActivityData(activityId: string): Promise<{ activity: Activity; reviewsData: Reviews }> {
  // 실제 데이터 패칭 로직 추가 필요
  const activity = activityData; // 예제에서는 mockData 사용
  const reviews = reviewData.reviews.filter(review => review.activityId.toString() === activityId);
  const reviewsData: Reviews = {
    averageRating: reviewData.averageRating,
    totalCount: reviewData.totalCount,
    reviews,
  };
  return { activity, reviewsData };
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { activityId } = params;

  const [data, setData] = useState<{ activity: Activity; reviewsData: Reviews } | null>(null);

  useEffect(() => {
    getActivityData(activityId).then(fetchedData => {
      setData(fetchedData);
    });
  }, [activityId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { activity, reviewsData } = data;

  const images = activity.subImages.map(image => image.imageUrl);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex-1">
          <ActivityTitle
            category={activity.category}
            title={activity.title}
            rating={activity.rating}
            reviewCount={activity.reviewCount}
            location={activity.address}
          />
        </div>
        <div className="flex-none">
          <DropDownMenu />
        </div>
      </div>
      <ActivityImageGallery bannerImage={activity.bannerImageUrl} images={images} />
      <div className="flex flex-col gap-6 md:flex-row md:gap-6 xl:flex-row xl:gap-6">
        <div className="w-full">
          <ActivityDescription description={activity.description} />
          <ActivityReviews
            averageRating={reviewsData.averageRating}
            totalCount={reviewsData.totalCount}
            reviews={reviewsData.reviews}
          />
        </div>
        <div className="pt-[85px] md:relative md:w-[251px] xl:relative xl:w-[384px]">
          <div className="fixed bottom-0 left-0 right-0 z-30 w-full bg-white md:relative xl:relative">
            <ReservationFloatingBox schedules={activity.schedules} price={activity.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
