"use server";

import { PatchReservations } from "@/types/myReservations.type";
import fetchInstance from "@/utils/fetchInstance";

const ReservationInput = { status: "canceled" }; // 고정 값이라 데이터 값을 세팅 해둠

const patchMyReservations = async (reservationId: number, p0: { status: string }) => {
  try {
    const data = await fetchInstance<PatchReservations>(`my-reservations/${reservationId}`, {
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

export default patchMyReservations;
