import fetchInstance from "@/utils/fetchInstance";

export interface Reservation {
  activity: {
    title: string;
    bannerImageUrl: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: string;
  status: string;
  headCount: string;
}

export interface MyReservationsResponse {
  reservations: Reservation[];
}

export const fetchMyReservations = async () => {
  try {
    const data = await fetchInstance<MyReservationsResponse>("my-reservations", {
      method: "GET",
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "reservation data failed");
    } else {
      throw new Error("reservation data failed");
    }
  }
};
