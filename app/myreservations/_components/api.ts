const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzEwLCJ0ZWFtSWQiOiI2LTExIiwiaWF0IjoxNzIyMzUwMDcxLCJleHAiOjE3MjM1NTk2NzEsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.wKKF9ioNjGW0aSF9lXfEBKFlpI5KcRxIYSFFLmXqHNk";

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

export const fetchMyReservations = async (): Promise<MyReservationsResponse> => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}my-reservations`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
