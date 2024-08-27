import getMyActivities from "@api/MyActivities/getMyActivities";
import DefaultButton from "@button/DefaultButton";
import Link from "next/link";
import MyActivitiesClient from "./MyActivitiesClient";

export default async function MyActivities() {
  const initialData = await getMyActivities({ size: 20 }); // 서버에서 초기 데이터를 로드

  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="font-pretendard text-[32px] font-bold leading-[42px]">내 체험 관리</h1>
        <Link href="/myactivities/activity-registration">
          <DefaultButton
            type="nomadBlack"
            className="flex h-[48px] w-[120px] items-center justify-center whitespace-nowrap p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
          >
            체험 등록하기
          </DefaultButton>
        </Link>
      </div>
      <MyActivitiesClient initialData={initialData} />
    </div>
  );
}
