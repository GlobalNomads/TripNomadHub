"use client";

import React, { useState, useEffect } from "react";
//------------------------------------------components
import SearchBar from "./SearchBar";
import Pagination from "@/components/Pagination";
import CategoryFilter from "./CategoryFilter";
import PopularActivities from "./PopularActivities";
import AllActivities from "./AllActivities";
import getActivities from "@/api/Activities/getActivities";
import { ActivitiesData } from "@/types/activities.type";
//-------------------------------------------MainPage
const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);
  const [popularActivities, setPopularActivities] = useState<ActivitiesData | undefined>(undefined);
  const [allActivities, setAllActivities] = useState<ActivitiesData | undefined>(undefined);
  const [activitySize, setActivitySize] = useState(4);

  // 화면 크기 변경에 따른 size 조정
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setActivitySize(4); // PC 크기
      } else if (width >= 768) {
        setActivitySize(3); // 태블릿 크기
      } else {
        setActivitySize(2); // 모바일 크기
      }
    };

    updateSize(); // 초기 로드 시 설정
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // 인기 체험 데이터를 가져오는 함수
  useEffect(() => {
    const fetchPopularActivities = async () => {
      try {
        const data = await getActivities({
          method: "offset",
          sort: "most_reviewed",
          size: activitySize, // 화면 크기에 따라 size 동적 조정
        });
        setPopularActivities(data);
      } catch (error) {
        console.error("Failed to fetch popular activities:", error);
      }
    };

    fetchPopularActivities();
  }, [activitySize]);

  // 모든 체험 데이터를 가져오는 함수
  useEffect(() => {
    const fetchAllActivities = async () => {
      try {
        const data = await getActivities({
          method: "offset",
          sort: "latest",
          page: currentPage,
          size: activitySize * 2, // 화면 크기에 따라 size 동적 조정
          keyword: searchKeyword || undefined, // searchKeyword가 빈 문자열일 경우 undefined 전달
        });
        setAllActivities(data);
        setTotalPages(Math.ceil(data.totalCount / (activitySize * 2)));
      } catch (error) {
        console.error("Failed to fetch all activities:", error);
      }
    };

    fetchAllActivities();
  }, [currentPage, searchKeyword, activitySize]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword || undefined); // 빈 검색어를 처리
    setCurrentPage(1); // 새 검색 시 첫 페이지로 리셋
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-12 md:mt-12 xl:mt-12">
        <h2 className="xs:text-2xl-bold mb-4 text-lg-semibold font-semibold text-primary-black-200 sm:text-2xl-bold md:text-2xl-bold">
          🔥인기 체험
        </h2>
        {/* 인기 체험 섹션 */}
        <PopularActivities data={popularActivities || undefined} />
      </div>

      <div className="mt-12 md:mt-32 xl:mt-40">
        <CategoryFilter />
        {/* 모든 체험 섹션 */}
        <h2 className="xs:text-2xl-bold my-6 font-semibold text-primary-black-200 sm:text-2xl-bold md:mb-8 md:mt-9">
          🌍 모든 체험
        </h2>
        <AllActivities data={allActivities || undefined} />
      </div>

      <div className="mb-30 md:mt-18 my-12 mt-10 flex justify-center md:mb-[165px] xl:mb-[85px] xl:mt-16">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </>
  );
};

export default MainPage;
