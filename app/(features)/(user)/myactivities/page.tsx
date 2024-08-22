"use client";

import DropDownMenu from "@/(features)/activity/_components/DropDownMenu";
import ReservationCard from "@/components/ReservationCard";
import { ActivitiesData, ActivityList } from "@/types/activities.type";
import getMyActivities from "@api/MyActivities/getMyActivities";
import DefaultButton from "@button/DefaultButton";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const MyActivities: React.FC = () => {
  const [activitiesData, setActivitiesData] = useState<ActivitiesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getMyActivities();
        setActivitiesData(data);
      } catch (err) {
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activitiesData || activitiesData.activities.length === 0) {
    return <div>표시할 데이터가 없습니다.</div>;
  }

  return (
    <div>
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
      </div>
      {activitiesData.activities.map((activity: ActivityList) => (
        <ReservationCard
          key={activity.id} // id 사용
          reservations={activitiesData.activities} // 올바른 타입 전달
          getImageUrl={(activity: ActivityList) => activity.bannerImageUrl || ""} // 타입 명시 및 null 처리
          getTitle={(activity: ActivityList) => activity.title} // 타입 명시
          getRating={(activity: ActivityList) => activity.rating} // 타입 명시
          getReviewCount={(activity: ActivityList) => activity.reviewCount} // 타입 명시
          getPrice={(activity: ActivityList) => activity.price} // 타입 명시
        >
          {(reservation: ActivityList) => (
            <DropDownMenu activityId={reservation.id} /> // id 사용
          )}
        </ReservationCard>
      ))}
    </div>
  );
};

export default MyActivities;
