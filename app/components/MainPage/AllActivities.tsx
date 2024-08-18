import React from "react";
import Activity from "./Activity";
import type { ActivitiesData } from "@/types/activities.type";


const AllActivities = ({ data }: { data?: ActivitiesData }) => {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-24">
      {data?.activities.map(activity => <Activity key={activity.id} data={activity} />)}
    </div>
  );
};

export default AllActivities;
