"use server";

import { MyActivitiesResData } from "@/types/myActivities.type";
import fetchInstance from "@/utils/fetchInstance";

const getMyActivitiesIdRes = async (
  activityId: number,
  options?: {
    scheduleId?: number;
    cursorId?: number;
    size?: number;
    status?: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  },
) => {
  try {
    const data = await fetchInstance<MyActivitiesResData>(`my-activities/${activityId}/reservations`, {
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

export default getMyActivitiesIdRes;
