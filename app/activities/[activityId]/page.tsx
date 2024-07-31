"use client";

/*
  체험 상세 페이지
  Todo: 
    (1)체험 상세, 
    (2)카카오 지도 연결,
    (3)후기 연결,
    (4)예약 관리,
    (5)동적 라우팅 연결하기, 
    (6)MockData 없애고 실제 API와 데이터 연결하기
*/

import { useEffect, useState } from "react";
import ActivityDescription from "../_components/ActivityDescription";
import ActivityImageGallery from "../_components/ActivityImageGallery";
import ActivityReviews from "../_components/ActivityReviews";
import ActivityTitle from "../_components/ActivityTitle";
import DropDownMenu from "../_components/DropDownMenu";
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

interface ActivityPageProps {
  params: { activityId: string };
}

async function getActivityData(activityId: string): Promise<{ activity: Activity; reviews: Review[] }> {
  // 실제 데이터 패칭 로직 추가 필요
  const activity = activityData; // 예제에서는 mockData 사용
  const reviews = reviewData.reviews.filter(review => review.activityId.toString() === activityId);
  return { activity, reviews };
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { activityId } = params;

  const [data, setData] = useState<{ activity: Activity; reviews: Review[] } | null>(null);

  useEffect(() => {
    getActivityData(activityId).then(fetchedData => {
      setData(fetchedData);
    });
  }, [activityId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { activity, reviews } = data;

  const images = activity.subImages.map(image => image.imageUrl);
  return (
    <div>
      Activities
      <div className="flex items-center justify-between">
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
      <ActivityDescription description={activity.description} />
      <ActivityReviews reviews={reviews} />
    </div>
  );
}
