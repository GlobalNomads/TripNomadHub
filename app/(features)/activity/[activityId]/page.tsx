/*
  체험 상세 페이지
  Todo: 
    (1)내가 만든 체험인 경우 예약카드 보이지 않게하기
*/

import getActivitiesId from "@api/Activities/getActivitiesId"; // API 함수 (체험 정보)
import getActivitiesIdRev from "@api/Activities/getActivitiesIdRev"; //API 함수(ReviewData)
import getUserData from "@api/Users/getUsersMe"; //로그인된 사용자 정보를 가져오는 API 함수
import ActivityDescription from "../_components/ActivityDescription";
import ActivityImageGallery from "../_components/ActivityImageGallery";
import ActivityLocationServer from "../_components/ActivityLocationServer";
import ActivityReviewClient from "../_components/ActivityReviewClient";
import ActivityTitle from "../_components/ActivityTitle";
import DropDownMenu from "../_components/DropDownMenu";
import ReservationFloatingBox from "../_components/ReservationFloatingBox";

export default async function ActivityPage({ params }: { params: { activityId: string } }) {
  const activityId = Number(params.activityId);
  const activity = await getActivitiesId(activityId);
  const images = activity.subImages?.map(image => image.imageUrl) ?? [];

  let user = null;

  try {
    user = await getUserData(); // 로그인한 사용자의 정보 가져오기
  } catch (error) {
    // 로그인하지 않은 경우 또는 사용자 정보를 가져오지 못한 경우, user는 null로 유지됩니다.
  }

  const isOwner = user && activity.userId === user.id; // 사용자가 만든 체험인지 확인

  // 서버에서 fetch로 리뷰 데이터 가져오기
  const initialReviews = await getActivitiesIdRev(activityId);

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <div className="flex-1">
          <ActivityTitle
            category={activity.category}
            title={activity.title}
            rating={activity.rating}
            reviewCount={activity.reviewCount}
            address={activity.address}
          />
        </div>
        <div className="flex-none">{isOwner && <DropDownMenu activityId={activityId} />}</div>
      </div>
      <ActivityImageGallery bannerImage={activity.bannerImageUrl} images={images} />
      <div className="flex flex-col gap-6 md:flex-row md:gap-6">
        <div className="w-full">
          <ActivityDescription description={activity.description} />
          <hr className="my-10 hidden border-t border-primary-black-100 opacity-25 md:block" />
          <ActivityLocationServer address={activity.address} />
          <hr className="my-4 border-t border-primary-black-100 opacity-25 md:my-10 md:block" />
          <ActivityReviewClient initialReviews={initialReviews} activityId={activityId} />
        </div>
        <div className="pt-[85px] md:relative md:w-[258px] xl:w-[384px]">
          <div className="fixed bottom-0 left-0 right-0 z-30 w-full bg-white md:relative md:w-[258px] xl:relative xl:w-[384px]">
            <ReservationFloatingBox
              activityId={activity.id as number}
              schedules={activity.schedules}
              price={activity.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
