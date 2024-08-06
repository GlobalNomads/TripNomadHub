export interface ActivityData {
  bannerImageUrl: string;
  title: string;
  id: number;
}

export interface ReservationsList {
  id: number;
  teamId: string;
  userId: number;
  activity: ActivityData;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationsData {
  cursorId: number;
  reservations: ReservationsList[];
  totalCount: number;
}

export interface PatchReservations {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostReservations {
  deletedAt: string;
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}
