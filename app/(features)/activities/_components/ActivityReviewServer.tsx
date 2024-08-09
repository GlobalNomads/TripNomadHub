// components/ActivityReviewServer.tsx
import { ReviewList } from "@/types/activities.type";
import ActivityReviewClient from "./ActivityReviewClient";

interface ActivityReviewServerProps {
  averageRating: number;
  totalCount: number;
  reviews: ReviewList[];
  currentPage: number;
  totalPages: number;
  activityId: number;
}

export default function ActivityReviewServer({
  averageRating,
  totalCount,
  reviews,
  currentPage,
  totalPages,
  activityId,
}: ActivityReviewServerProps) {
  return (
    <ActivityReviewClient
      averageRating={averageRating}
      totalCount={totalCount}
      reviews={reviews}
      currentPage={currentPage}
      totalPages={totalPages}
      activityId={activityId}
    />
  );
}
