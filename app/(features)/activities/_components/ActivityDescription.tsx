/*
    체험 상세 페이지 체험 설명 컴포넌트
    TODO: API 연결(현재: MockData 연결됨)
*/

import { ActivityDescriptionProps } from "@/types/activities.type";
import { FC } from "react";

const ActivityDescription: FC<ActivityDescriptionProps> = ({ description }) => {
  return (
    <>
      <hr className="mb-4 mt-[85px] hidden border-t border-primary-black-100 opacity-25 md:block" />
      <div className="with-full py-4 text-primary-black-100">
        <div className="pb-4 text-xl-bold">체험설명</div>
        <div className="text-lg-semibold">{description}</div>
        <hr className="my-4 border-t border-primary-black-100 opacity-25 md:hidden" />
      </div>
    </>
  );
};

export default ActivityDescription;
