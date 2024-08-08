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

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reviews {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export interface ScheduleData {
  date: string;
  times: Schedule[];
}

export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

export interface PostActivities {
  schedules: ScheduleData[];
}

export interface ActivityPageProps {
  params: { activityId: string };
}

export interface ActivityTitleProps {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
}

export interface ParticipantCountProps {
  count: number;
  setCount: (count: number) => void;
}

export interface PriceInfoProps {
  price: number;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ReservationFloatingBoxProps {
  schedules: Schedule[];
  price: number;
}

export interface ScheduleSelectorProps {
  schedules: Schedule[];
  setSelectedSchedule: (schedule: string) => void;
}

export interface TotalPriceProps {
  price: number;
  count: number;
}

export interface ActivityDescriptionProps {
  description: string;
}

export interface ImageGalleryProps {
  images: string[];
  bannerImage: string;
}

export interface ActivityLocationProps {
  address: string;
}

export interface SwiperContainerProps {
  images: string[];
}
