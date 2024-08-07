"use server";

import { ActivitiesReviewData } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const getActivitiesIdRev = async (activityId: number, options?: { page?: number; size?: number }) => {
  try {
    const data = await fetchInstance<ActivitiesReviewData>(`activities/${activityId}/reviews`, {
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

export default getActivitiesIdRev;
