"use server";

import { ReservationRequest } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const postActivitiesIdRez = async (ActivityData: ReservationRequest, activityId: number) => {
  try {
    const data = await fetchInstance<ReservationRequest>(`activities/${activityId}/reservations`, {
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
