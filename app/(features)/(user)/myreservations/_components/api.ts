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

export interface MyReservationsResponse {
  reservations: Reservation[];
}

export const fetchMyReservations = async (): Promise<MyReservationsResponse> => {
  const url = "my-reservations";
  return fetchInstance<MyReservationsResponse>(url);
};
