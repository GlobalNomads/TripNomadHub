"use server";

import { MyActivitiesData } from "@/types/myActivities.type";
import fetchInstance from "@/utils/fetchInstance";

export interface StatsInput {
  status: "declined" | "confirmed";
}

const patchMyActivitiesIdResId = async (ReservationInput: StatsInput, activityId: number, reservationId: number) => {
  try {
    const data = await fetchInstance<MyActivitiesData>(`my-activities/${activityId}/reservations/${reservationId}`, {
      method: "PATCH",
      body: JSON.stringify(ReservationInput),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "reservation failed");
    } else {
      throw new Error("reservation failed");
    }
  }
};

export default patchMyActivitiesIdResId;
