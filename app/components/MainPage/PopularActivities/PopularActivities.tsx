import React, { useEffect, useState } from "react";
import PopularActivity from "./PopularActivity";
import type { ActivitiesData } from "@/types/activities.type";
import getActivities from "@/api/Activities/getActivities";
import useUpdateActivitySize from "../hooks/useUpdateActivitySize";

const PopularActivities = () => {
  const [popularActivities, setPopularActivities] = useState<ActivitiesData | undefined>(undefined);
  const { activitySize } = useUpdateActivitySize();
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 인기 체험 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPopularActivities = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data = await getActivities({
          method: "offset",
          sort: "most_reviewed",
          size: activitySize, // 화면 크기에 따라 size 동적 조정
        });
        setPopularActivities(data);
      } catch (error) {
        console.error("Failed to fetch popular activities:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchPopularActivities();
  }, [activitySize]);

  return (
    <div className="mt-12 md:mt-12 xl:mt-12">
      <h2 className="xs:text-2xl-bold mb-4 text-lg-semibold font-semibold text-primary-black-200 sm:text-2xl-bold md:text-2xl-bold">
        🔥인기 체험
      </h2>
      {loading ? (
        <p>Loading popular activities...</p> // 로딩 상태 표시
      ) : (
        <div className="no-scrollbar -m-5 flex gap-4 overflow-x-auto p-5 md:gap-8 xl:gap-6">
          {popularActivities?.activities.map(activity => (
            <PopularActivity key={activity.id} data={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularActivities;
