"use server";

import { ActivitiesData } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const getMyActivities = async (options?: { cursorId?: number; size?: number }) => {
  try {
    const data = await fetchInstance<ActivitiesData>("my-activities", {
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

export default getMyActivities;
