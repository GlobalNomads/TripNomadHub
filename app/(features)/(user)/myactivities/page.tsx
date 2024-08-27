"use client"; // 클라이언트 컴포넌트로 지정

import DropDownMenu from "@/components/DropDown/ActivityEditDelete";
import ReservationCard from "@/components/ReservationCard";
import { ActivitiesData, ActivityList } from "@/types/activities.type";
import getMyActivities from "@api/MyActivities/getMyActivities";
import DefaultButton from "@button/DefaultButton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyActivities() {
  const [initialData, setInitialData] = useState<ActivitiesData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getMyActivities({ size: 20 });
      setInitialData(data);
    }
    fetchData();
  }, []);

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="font-pretendard text-[32px] font-bold leading-[42px]">내 체험 관리</h1>
        <Link href="/myactivities/activity-registration">
          <DefaultButton
            type="nomadBlack"
            className="flex h-[48px] w-[120px] items-center justify-center whitespace-nowrap p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
          >
            체험 등록하기
          </DefaultButton>
        </Link>
      </div>
      <div className="space-y-2 md:space-y-4 xl:space-y-6">
        {initialData.activities.length === 0 ? (
          <div>No activities found.</div>
        ) : (
          initialData.activities.map((activity: ActivityList) => (
            <ReservationCard
              key={activity.id}
              reservations={[activity]}
              getImageUrl={(activity: ActivityList) => activity.bannerImageUrl || ""}
              getTitle={(activity: ActivityList) => activity.title}
              maxTitleLength={18}
              getRating={(activity: ActivityList) => activity.rating}
              getReviewCount={(activity: ActivityList) => activity.reviewCount}
              getPrice={(activity: ActivityList) => activity.price}
            >
              <DropDownMenu activityId={activity.id} />
            </ReservationCard>
          ))
        )}
      </div>
    </div>
  );
}
