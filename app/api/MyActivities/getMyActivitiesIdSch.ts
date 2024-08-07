"use server";

import { MyActivitiesSchData } from "@/types/myActivities.type";
import fetchInstance from "@/utils/fetchInstance";

const getMyActivitiesIdSch = async (
  activityId: number,
  options?: {
    date?: string;
  },
) => {
  try {
    const data = await fetchInstance<MyActivitiesSchData[]>(`my-activities/${activityId}/reserved-schedule`, {
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

export default getMyActivitiesIdSch;
