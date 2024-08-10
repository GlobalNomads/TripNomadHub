import React from "react";
import PopularActivity from "./PopularActivity";
import type { ActivitiesData } from "@/types/activities.type";

// ActivitiesData를 props로 받아와 데이터를 렌더링합니다.
const PopularActivities = ({ data }: { data?: ActivitiesData }) => {
  return (
    <div className="no-scrollbar -m-5 flex gap-4 overflow-x-auto p-5 md:gap-8 xl:gap-6">
      {/* data가 존재하면 activities 배열을 map으로 순회하며 PopularActivity 컴포넌트를 렌더링 */}
      {data?.activities.map(activity => <PopularActivity key={activity.id} data={activity} />)}
    </div>
  );
};

export default PopularActivities;
