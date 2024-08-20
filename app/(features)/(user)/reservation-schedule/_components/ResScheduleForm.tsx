"use client";

import getMyActivities from "@/api/MyActivities/getMyActivities";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { ActivitiesData } from "@/types/activities.type";
import { useQuery } from "@tanstack/react-query";
import { activitiesData } from "../mockData";
import CalendarList from "./CalendarList";

function ResScheduleForm() {
  const { data } = useQuery<ActivitiesData | undefined>({
    queryKey: ["getMyActivities"],
    queryFn: () => getMyActivities({ size: 20 }),
    staleTime: 60000,
    retry: 2,
  });

  const noData = !activitiesData || activitiesData.activities.length === 0;

  return (
    <>
      {!noData ? (
        <div>
          <CalendarList activityData={data} />
        </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
}

export default ResScheduleForm;
