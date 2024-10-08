/*
    체험상세(activities) 페이지의 제목(Title) 컴포넌트
    체험상세 page에서 받아온 정보 중 category, title, rating, reviewCount, address를 전달받음
*/

import { ActivityTitleProps } from "@/types/activities.type";
import locationIcon from "@icon/ic_location.svg";
import star from "@icon/ic_star_on.svg";
import Image from "next/image";
import React from "react";

const ActivityTitle: React.FC<ActivityTitleProps> = ({ category, title, rating, reviewCount, address }) => {
  return (
    <>
      <div className="md-regular pb-[10px]">{category}</div>
      <div className="pb-[16px] text-2xl-bold md:text-3xl-bold">{title}</div>
      <div className="md-regular flex items-center space-x-3">
        <span className="flex items-center space-x-[4px] md:space-x-[6px]">
          <Image src={star} alt="rating" width={16} height={16} />
          <span>{rating}</span>
          <span>({reviewCount})</span>
        </span>
        <span className="flex items-center space-x-[2px]">
          <Image src={locationIcon} alt="location" width={18} height={18} />
          <span>{address}</span>
        </span>
      </div>
    </>
  );
};

export default ActivityTitle;
