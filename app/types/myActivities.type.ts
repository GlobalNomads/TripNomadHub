export interface MyActivitiesData {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: true;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationsList {
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

export interface MyActivitiesResData {
  cursorId: number;
  reservations: ReservationsList[];
  totalCount: number;
}

export interface Count {
  declined: number;
  confirmed: number;
  pending: number;
}

export interface MyActivitiesSchData {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: Count;
}

export interface Reservation {
  completed: number;
  confirmed: number;
  pending: number;
}

export interface MyActivitiesDashData {
  date: string;
  reservations: Reservation;
}
