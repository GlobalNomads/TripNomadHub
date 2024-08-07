"use client"; // 파일 상단에 추가

import React, { useState } from "react";

//--------------------------components
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import CategoryFilter from "./CategoryFilter";
import PopularActivity from "./PopularActivity";
import Activity from "./Activity";
import { Activites } from "./types";

//--------------------------MockData
export const activityData: Activites = {
  id: 1932,
  userId: 694,
  title: "함께 하면 즐거운 곽철이와 함께 춤을",
  description:
    "둠칫 둠칫 두둠칫 날이면 날마다 오는 체험이 아니다! 곽철이와 함께 댄스를 출 수 있는 특별한 기회! 특별한 가격에 모십니다! 곽철이와 함께 춤을!! 💃🕺",
  category: "투어", // Category 타입에 맞는 값이어야 합니다.
  price: 1000000,
  address: "서울특별시 강남구 테헤란로 427",
  bannerImageUrl:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/6-11_694_1721994832772.jpeg",
  rating: 4.8,
  reviewCount: 589,
  createdAt: "2024-07-26T13:49:15.140Z",
  updatedAt: "2024-07-26T13:49:15.140Z",
};

//----------------------------Main
const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <>
      <SearchBar />
      <div className="mt-12 md:mt-12 xl:mt-12">
        <h1 className="xs:text-2xl-bold mb-4 text-lg-semibold font-semibold text-primary-black-200 sm:text-2xl-bold md:text-2xl-bold">
          🔥인기 체험
        </h1>
        <div className="no-scrollbar -m-5 flex gap-4 overflow-x-auto p-5 md:gap-8 xl:gap-6">
          <PopularActivity data={activityData} />
          <PopularActivity data={activityData} />
          <PopularActivity data={activityData} />
        </div>
      </div>
      <div className="mt-12 md:mt-32 xl:mt-40">
        <CategoryFilter />
        {/* 카테고리 메뉴 드롭 다운 */}
        <h1 className="xs:text-2xl-bold my-6 font-semibold text-primary-black-200 sm:text-2xl-bold md:mb-8 md:mt-9">
          🌍 모든 체험
        </h1>
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3 md:gap-x-16 md:gap-y-32 xl:grid-cols-4 xl:gap-x-12 xl:gap-y-24">
          <Activity data={activityData} />
          <Activity data={activityData} />
          <Activity data={activityData} />
          <Activity data={activityData} />
        </div>
      </div>

      <div className="mb-30 md:mt-18 my-12 mt-10 flex justify-center md:mb-[165px] xl:mb-[85px] xl:mt-16">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </>
  );
};

export default MainPage;
