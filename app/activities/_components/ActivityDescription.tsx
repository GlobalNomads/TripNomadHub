/*
    체험 상세 페이지 체험 설명 컴포넌트
    TODO: API 연결(현재: MockData 연결됨)
*/

import { FC } from "react";

interface ActivityDescriptionProps {
  description: string;
}

const ActivityDescription: FC<ActivityDescriptionProps> = ({ description }) => {
  return (
    <>
      <hr className="my-4 hidden border-t border-gray-300 md:block xl:block" />
      <div className="with-full px-6 py-4 text-primary-black-100">
        <div className="pb-4 text-[20px] font-bold">체험설명</div>
        <div className="text-lg-semibold">{description}</div>
        <hr className="my-4 border-t border-gray-300 md:hidden xl:hidden" />
      </div>
      <hr className="my-4 hidden border-t border-gray-300 md:block xl:block" />
    </>
  );
};

export default ActivityDescription;
