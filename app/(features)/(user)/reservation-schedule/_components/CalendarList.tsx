"use client";

import { ActivitiesData } from "@/types/activities.type";
import { useState } from "react";
import Calendar from "./Calendar";
import NoSelectPage from "./NoSelectPage";

function CalendarList({ activityData }: { activityData: ActivitiesData | undefined }) {
  const [activityId, setActivityId] = useState<number | null>(null);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedActivityId = e.target.value;
    setActivityId(selectedActivityId ? parseInt(selectedActivityId, 10) : null); // 선택된 ID를 숫자로 변환하거나 빈 문자열일 경우 null로 설정
  };

  return (
    <>
      <div className="relative">
        <select
          className="z-3 box-border h-[50px] w-full max-w-[790px] rounded-md border bg-primary-gray-100 px-5 py-3 text-lg-regular text-primary-black-200"
          onChange={handleChangeSelect}
          defaultValue=""
        >
          <option value="" disabled>
            체험을 선택해 주세요.
          </option>
          {activityData?.activities.map(activity => (
            <option value={activity.id} key={activity.id}>
              {activity.title}
            </option>
          ))}
        </select>
        <label className="absolute left-10 top-0 -translate-y-1/2 bg-primary-gray-100 px-2 text-gray-500">체험명</label>
      </div>

      {/* activityId가 있을때만 Calendar 컴포넌트 렌더링 */}
      {activityId !== null ? <Calendar activityId={activityId} /> : <NoSelectPage />}
    </>
  );
}

export default CalendarList;
