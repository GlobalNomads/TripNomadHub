"use server";

import { ActivitiesIdData } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const getActivitiesId = async (activityId: number) => {
  try {
    const data = await fetchInstance<ActivitiesIdData>(`activities/${activityId}`, {
      method: "GET",
      mode: "no-cors",
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
