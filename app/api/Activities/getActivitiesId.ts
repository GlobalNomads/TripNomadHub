"use server";

import { Activity } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const getActivitiesId = async (activityId: number) => {
  try {
    const data = await fetchInstance<Activity>(`activities/${activityId}`, {
      method: "GET",
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

export default getActivitiesId;
