"use client";

import DropDownMenu from "@/components/DropDown/ActivityEditDelete";
import ReservationCard from "@/components/ReservationCard";
import { ActivitiesData, ActivityList } from "@/types/activities.type";

type MyActivitiesClientProps = {
  initialData: ActivitiesData;
};

const MyActivitiesClient: React.FC<MyActivitiesClientProps> = ({ initialData }) => {
  return (
    <div className="space-y-2 md:space-y-4 xl:space-y-6">
      {initialData.activities.length === 0 ? (
        <div>No activities found.</div>
      ) : (
        initialData.activities.map((activity: ActivityList) => (
          <ReservationCard
            key={activity.id}
            reservations={[activity]}
            getImageUrl={(activity: ActivityList) => activity.bannerImageUrl || ""}
            getTitle={(activity: ActivityList) => activity.title}
            maxTitleLength={18}
            getRating={(activity: ActivityList) => activity.rating}
            getReviewCount={(activity: ActivityList) => activity.reviewCount}
            getPrice={(activity: ActivityList) => activity.price}
          >
            <DropDownMenu activityId={activity.id} />
          </ReservationCard>
        ))
      )}
    </div>
  );
};

export default MyActivitiesClient;
