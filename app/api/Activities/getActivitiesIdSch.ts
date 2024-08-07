"use server";

import { ScheduleData } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const getActivitiesIdSch = async (activityId: number, options?: { year?: string; month?: string }) => {
  try {
    const data = await fetchInstance<ScheduleData[]>(`activities/${activityId}/available-schedule`, {
      method: "GET",
      params: options,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "activities data failed");
    } else {
      throw new Error("activities data failed");
    }
  }
};

export default getActivitiesIdSch;
