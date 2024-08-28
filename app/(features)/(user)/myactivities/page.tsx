import getMyActivities from "@api/MyActivities/getMyActivities";
import DefaultButton from "@button/DefaultButton";
import Link from "next/link";
import MyActivitiesClientBody from "./_components/MyActivitiesClientBody";

export default async function MyActivities() {
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getMyActivities({ size: 20 });
  //     setInitialData(data);
  //   }
  //   fetchData();
  // }, []);

  const data = await getMyActivities({ size: 20 });

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
      <MyActivitiesClientBody initialData={data} />
    </div>
  );
}
