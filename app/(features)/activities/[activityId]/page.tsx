"use client";

/*
  체험 상세 페이지
  Todo: 
    (1)MockData 없애고 실제 API와 데이터 연결하기
    (2)Dropdown menu- '내가만든 체험인 경우에만 나타나도록 적용
    (3)내가 만든 체험인 경우 예약카드 보이지 않게하기
    (4)예약완료시 예약완료 모달창 연결
*/

import { Activity, ActivityPageProps, Reviews } from "@/types/activities.type";
import { useEffect, useState } from "react";
import ActivityDescription from "../_components/ActivityDescription";
import ActivityImageGallery from "../_components/ActivityImageGallery";
import ActivityLocation from "../_components/ActivityLocation";
import ActivityReviews from "../_components/ActivityReviews";
import ActivityTitle from "../_components/ActivityTitle";
import DropDownMenu from "../_components/DropDownMenu";
import ReservationFloatingBox from "../_components/ReservationFloatingBox";
import { activityData, reviewData } from "../mockData";

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
      <div className="flex flex-col gap-6 md:flex-row md:gap-6">
        <div className="w-full">
          <ActivityDescription description={activity.description} />
          <hr className="my-10 hidden border-t border-primary-black-100 opacity-25 md:block" />
          <ActivityLocation address={activity.address} />
          <hr className="my-4 border-t border-primary-black-100 opacity-25 md:my-10 md:block" />
          <ActivityReviews
            averageRating={reviewsData.averageRating}
            totalCount={reviewsData.totalCount}
            reviews={reviewsData.reviews}
          />
        </div>
        <div className="pt-[85px] md:relative md:w-[258px] xl:w-[384px]">
          <div className="fixed bottom-0 left-0 right-0 z-30 w-full bg-white md:relative md:w-[258px] xl:relative xl:w-[384px]">
            <ReservationFloatingBox schedules={activity.schedules} price={activity.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
