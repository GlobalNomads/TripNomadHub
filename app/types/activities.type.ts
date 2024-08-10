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
  activityId: number;
  user: ReviewUser;
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
  id?: number | undefined;
  date: string;
  startTime: string;
  endTime: string;
}

//체험 상세 페이지
export interface ActivityTitleProps extends ActivityLocationProps {
  category: string;
  title: string;
  rating?: number;
  reviewCount?: number;
}

export interface ActivityLocationProps {
  address: string;
}

export interface ActivitiesDataProp extends ActivityTitleProps {
  id?: number;
  userId?: number;
  description: string;
  price: number;
  bannerImageUrl: string;
  subImages?: SubImageUrls[];
  subImageUrls?: SubImageUrls[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ActivitiesIdData extends ActivitiesDataProp {
  schedules: Schedules[];
}

export interface ActivityDescriptionProps {
  description: string;
}

export interface ImageGalleryProps {
  images: string[];
  bannerImage: string;
}

export interface SwiperContainerProps {
  images: string[];
}

// Reservation Floating Box
export interface ParticipantCountProps {
  count: number;
  setCount: (count: number) => void;
}

export interface PriceInfoProps {
  price: number;
}

export interface TotalPriceProps extends PriceInfoProps {
  count: number;
}

export interface ActivityPageProps {
  params: { activityId: string };
}

export interface PostActivities {
  schedules: ScheduleData[];
}

export interface ReservationFloatingBoxProps extends PriceInfoProps {
  schedules: Schedules[];
  activityId: number;
}

export interface ScheduleSelectorProps {
  schedules: Schedules[];
  setSelectedScheduleId: (scheduleId: number) => void;
}

export interface ReservationRequest {
  activityId: number;
  scheduleId: number;
  headCount: number;
}
