"use server";

import { MyActivitiesData } from "@/types/myActivities.type";
import fetchInstance from "@/utils/fetchInstance";

const ReservationInput = { status: "declined" }; // 고정 값이라 데이터 값을 세팅 해둠

const patchMyActivitiesIdResId = async (activityId: number, reservationId: number) => {
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
