import getActivities from "@/api/Activities/getActivities";
import { ActivitiesData } from "@/types/activities.type";
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";
import Activity from "./Activity";
import useUpdateActivitySize from "../hooks/useUpdateActivitySize";

interface Props {
  currentPage: number;
  searchKeyword?: string;
  category?: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  sort: "latest" | "most_reviewed" | "price_asc" | "price_desc";
  setTotalPages: Dispatch<SetStateAction<number>>;
}

const AllActivities = ({ currentPage, searchKeyword, category, sort, setTotalPages }: Props) => {
  const { activitySize } = useUpdateActivitySize();
  const [allActivities, setAllActivities] = useState<ActivitiesData | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    const fetchAllActivities = async () => {
      setLoading(true); // 로딩 시작
      try {
        const data = await getActivities({
          method: "offset",
          sort,
          category,
          page: currentPage,
          size: activitySize * 2, // 화면 크기에 따라 size 동적 조정
          keyword: searchKeyword || undefined, // searchKeyword가 빈 문자열일 경우 undefined 전달
        });
        startTransition(() => setAllActivities(data));
        setTotalPages(Math.ceil(data.totalCount / (activitySize * 2)));
      } catch (error) {
        console.error("Failed to fetch all activities:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchAllActivities();
  }, [currentPage, searchKeyword, category, sort, activitySize, setTotalPages]); // category와 sort 추가

  return (
    <>
      {!searchKeyword && (
        <h2 className="my-6 font-semibold text-primary-black-200 md:mb-8 md:mt-9 md:text-2xl-bold">
          {category ? category : "🌍 모든 체험"}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-10">
        {allActivities?.activities.map(activity => <Activity key={activity.id} data={activity} />)}
      </div>
    </>
  );
};

export default AllActivities;
