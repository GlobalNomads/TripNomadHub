"use server";

import { ReservationsData } from "@/types/myReservations.type";
import fetchInstance from "@/utils/fetchInstance";

const getMyReservations = async (options?: {
  cursorId?: number;
  size?: number;
  status?: "pending" | "confirmed" | "declined" | "canceled" | "completed";
}) => {
  try {
    const data = await fetchInstance<ReservationsData>("my-reservations", {
      method: "GET",
      params: options,
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

export default getMyReservations;
