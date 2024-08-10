/*
  체험 상세 페이지
  Todo: 
    (1)MockData 없애기
    (2)Dropdown menu- '내가만든 체험인 경우에만 나타나도록 적용
    (3)내가 만든 체험인 경우 예약카드 보이지 않게하기
    (4)예약완료시 예약완료 모달창 연결
*/

import getActivitiesId from "@api/Activities/getActivitiesId"; // API 함수
import getActivitiesIdRev from "@api/Activities/getActivitiesIdRev"; // API 함수
import ActivityDescription from "../_components/ActivityDescription";
import ActivityImageGallery from "../_components/ActivityImageGallery";
import ActivityLocationServer from "../_components/ActivityLocationServer";
import ActivityReviewServer from "../_components/ActivityReviewServer"; //
import ActivityTitle from "../_components/ActivityTitle";
import DropDownMenu from "../_components/DropDownMenu";
import ReservationFloatingBox from "../_components/ReservationFloatingBox";

export default async function ActivityPage({ params }: { params: { activityId: string } }) {
  const activity = await getActivitiesId(Number(params.activityId));
  const reviewsData = await getActivitiesIdRev(Number(params.activityId));

  const images = activity.subImages?.map(image => image.imageUrl) ?? [];

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
        <div className="flex-none">
          <DropDownMenu />
        </div>
      </div>
      <ActivityImageGallery bannerImage={activity.bannerImageUrl} images={images} />
      <div className="flex flex-col gap-6 md:flex-row md:gap-6">
        <div className="w-full">
          <ActivityDescription description={activity.description} />
          <hr className="my-10 hidden border-t border-primary-black-100 opacity-25 md:block" />
          <ActivityLocationServer address={activity.address} />
          <hr className="my-4 border-t border-primary-black-100 opacity-25 md:my-10 md:block" />
          {reviewsData && (
            <ActivityReviewServer
              averageRating={reviewsData.averageRating}
              totalCount={reviewsData.totalCount}
              reviews={reviewsData.reviews}
              currentPage={1} // 초기 페이지 번호
              totalPages={Math.ceil(reviewsData.reviews.length / 3)} // 페이지 수 계산
              activityId={activity.id ?? 0} // 페이지네이션에 필요, undefined를 허용하지 않도록 확인
            />
          )}
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
