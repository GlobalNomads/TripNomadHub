"use server";

import { PostReservations } from "@/types/myReservations.type";
import fetchInstance from "@/utils/fetchInstance";

export interface ReservationInput {
  rating: number;
  content: string;
}

const postMyReservations = async (reservationInput: ReservationInput, reservationId: number) => {
  try {
    const data = await fetchInstance<PostReservations>(`my-reservations/${reservationId}/reviews`, {
      method: "POST",
      body: JSON.stringify({
        reservationId, // Make sure reservation.id is available
        rating: reservationInput.rating, // rating state
        content: reservationInput.content,
      }),
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

export default postMyReservations;
