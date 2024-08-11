/*
  체험 후기(Activity Review)의 Server 컴포넌트
*/

import ActivityReviewClient from "./ActivityReviewClient";

interface ActivityReviewServerProps {
  activityId: number;
}

export default function ActivityReviewServer({ activityId }: ActivityReviewServerProps) {
  return <ActivityReviewClient activityId={activityId} />;
}
