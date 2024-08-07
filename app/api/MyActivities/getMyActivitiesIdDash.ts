"use server";

import { MyActivitiesDashData } from "@/types/myActivities.type";
import fetchInstance from "@/utils/fetchInstance";

const getMyActivitiesIdDash = async (
  activityId: number,
  options?: {
    year?: string;
    month?: string;
  },
) => {
  try {
    const data = await fetchInstance<MyActivitiesDashData[]>(`my-activities/${activityId}/reservation-dashboard`, {
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

export default getMyActivitiesIdDash;
