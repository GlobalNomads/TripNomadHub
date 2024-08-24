"use server";

import { ReservationsData } from "@/types/myReservations.type";
import fetchInstance from "@/utils/fetchInstance";

type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

interface getMyReservationsOptions {
  size?: number;
  cursorId?: number;
  status?: ReservationStatus;
}
const getMyReservations = async (options: getMyReservationsOptions): Promise<ReservationsData> => {
  try {
    const params: Record<string, string | number> = {};

    if (options?.cursorId !== undefined && options.cursorId !== 1) {
      params.cursorId = options.cursorId;
    }
    if (options?.size !== undefined) {
      params.size = options.size;
    }
    if (options?.status !== undefined) {
      params.status = options.status;
    }
    const data = await fetchInstance<ReservationsData>("my-reservations", {
      method: "GET",
      params,
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
