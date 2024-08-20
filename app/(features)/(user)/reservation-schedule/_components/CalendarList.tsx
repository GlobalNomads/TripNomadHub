"use client";

import { ActivitiesData } from "@/types/activities.type";
import { useState } from "react";
import { activitiesData } from "../mockData";
import Calendar from "./Calendar";

function CalendarList({ activityData }: { activityData: ActivitiesData | undefined }) {
  const [activityId, setActivityId] = useState(0);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedActivity = activitiesData?.activities.find(activity => `${activity.id}` === e.target.value);
    if (selectedActivity) {
      setActivityId(selectedActivity.id); // 선택된 액티비티 ID를 캘린더로 전달
    }
  };

  return (
    <>
      <div className="relative">
        <select
          className="z-3 box-border h-[50px] w-full max-w-[790px] rounded-md border px-5 py-3 text-lg-regular text-primary-black-200"
          onChange={handleChangeSelect}
        >
          {activitiesData?.activities.map(activity => (
            <option className="h-14" value={activity.id} key={activity.id}>
              {activity.title}
            </option>
          ))}
        </select>
        <label className="absolute left-[5%] top-[-10px] z-10 text-gray-500">체험명</label>
      </div>

      <Calendar activityId={activityId} />
    </>
  );
}

export default CalendarList;
