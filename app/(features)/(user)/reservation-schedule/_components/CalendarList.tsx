"use client";

import { ActivitiesData } from "@/types/activities.type";
import { useState } from "react";
import Calendar from "./Calendar";

function CalendarList({ activityData }: { activityData: ActivitiesData | undefined }) {
  const [activityId, setActivityId] = useState(0);

  const handleChangeId = (selectId: number) => {
    setActivityId(selectId);
  };

  return (
    <>
      <div className="relative">
        <select className="z-3 box-border w-full max-w-[790px] rounded-md border px-5 py-3 text-lg-regular text-primary-black-200">
          {activityData?.activities.map(activity => (
            <option className="px-5 py-3" value={activity.id} key={activity.id} onChange={handleChangeId}>
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
