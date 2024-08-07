"use server";

import { PatchReservations } from "@/types/myReservations.type";
import fetchInstance from "@/utils/fetchInstance";

export interface ActivityRez {
  scheduleId: number;
  headCount: number;
}

const postActivitiesIdRez = async (ActivityData: ActivityRez, activityId: number) => {
  try {
    const data = await fetchInstance<PatchReservations>(`activities/${activityId}/reviews`, {
      method: "POST",
      body: JSON.stringify(ActivityData),
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

export default postActivitiesIdRez;
