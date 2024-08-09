export interface ActivityList {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string | null;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivitiesData {
  cursorId: number;
  totalCount: number;
  activities: ActivityList[];
}

export interface ActivitiesImageUrl {
  activityImageUrl: string;
}

export interface ReviewUser {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface ReviewList {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivitiesReviewData {
  averageRating: number;
  totalCount: number;
  reviews: ReviewList[];
}

export interface ScheduleTimeList {
  endTime: string;
  startTime: string;
  id: number;
}

export interface ScheduleData {
  date: string;
  times: ScheduleTimeList[];
}

export interface SubImageUrls {
  id?: number;
  imageUrl: string;
}

export interface Schedules {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivitiesDataProp {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls: SubImageUrls[];
  reviewCount?: number;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivitiesIdData extends ActivitiesDataProp {
  schedules: Schedules[];
}

export interface PostActivities {
  schedules: ScheduleData[];
}
