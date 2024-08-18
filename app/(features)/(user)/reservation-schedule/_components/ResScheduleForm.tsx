"use client";

import getMyActivities from "@/api/MyActivities/getMyActivities";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { ActivitiesData } from "@/types/activities.type";
import { useQuery } from "@tanstack/react-query";
import Calendar from "./Calendar";
import SelectBox from "./SelectBox";

function ResScheduleForm() {
  const { data } = useQuery<ActivitiesData | undefined>({
    queryKey: ["getMyActivities"],
    queryFn: () => getMyActivities(),
    staleTime: 60000,
    retry: 2,
  });

  const noData = !data || data.activities.length === 0;

  return (
    <>
      {noData ? (
        <div>
          <SelectBox activityData={data} />
          <Calendar />
        </div>
      ) : (
        <EmptyPage />
      )}
    </>
  );
}

export default ResScheduleForm;
