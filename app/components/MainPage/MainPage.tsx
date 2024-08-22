"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Pagination from "@/components/Pagination";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import PopularActivities from "./PopularActivities";
import AllActivities from "./AllActivities";
import getActivities from "@/api/Activities/getActivities";
import { ActivitiesData } from "@/types/activities.type";

// CategoryType 타입 정의
type CategoryType = "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙" | undefined;

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<"latest" | "most_reviewed" | "price_asc" | "price_desc">("latest");
  const [category, setCategory] = useState<CategoryType>(undefined);
  const [popularActivities, setPopularActivities] = useState<ActivitiesData | undefined>(undefined);
  const [allActivities, setAllActivities] = useState<ActivitiesData | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ActivitiesData | undefined>(undefined);
  const [activitySize, setActivitySize] = useState(4);

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

  const fetchPopularActivities = async () => {
    try {
      const data = await getActivities({
        method: "offset",
        sort: "most_reviewed",
        size: activitySize,
      });
      setPopularActivities(data);
    } catch (error) {
      console.error("Failed to fetch popular activities:", error);
    }
  };

  const fetchAllActivities = async () => {
    try {
      const data = await getActivities({
        method: "offset",
        sort,
        category,
        page: currentPage,
        size: activitySize * 2,
        keyword: searchKeyword || undefined,
      });
      setAllActivities(data);
      setTotalPages(Math.ceil(data.totalCount / (activitySize * 2)));
    } catch (error) {
      console.error("Failed to fetch all activities:", error);
    }
  };

  const fetchSearchResults = async (keyword: string) => {
    try {
      const data = await getActivities({
        method: "offset",
        sort,
        page: currentPage,
        size: activitySize * 2,
        keyword: keyword,
      });
      setSearchResults(data);
      setTotalPages(Math.ceil(data.totalCount / (activitySize * 2)));
      setIsSearching(true); // 검색 중 상태로 설정
    } catch (error) {
      console.error("Failed to fetch search results:", error);
    }
  };

  useEffect(() => {
    if (!isSearching) {
      fetchPopularActivities();
    }
  }, [activitySize, isSearching]);

  useEffect(() => {
    if (!isSearching) {
      fetchAllActivities();
    }
  }, [currentPage, searchKeyword, activitySize, category, sort, isSearching]);

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword || undefined);
    setCurrentPage(1);
    if (keyword) {
      fetchSearchResults(keyword);
    } else {
      setIsSearching(false); // 검색어가 없으면 검색 상태를 해제
      fetchAllActivities(); // 전체 체험 다시 로드
    }
  };

  const handleCategorySelect = (category: CategoryType) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const handleSortSelect = (sortOption: "latest" | "most_reviewed" | "price_asc" | "price_desc") => {
    setSort(sortOption);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {isSearching && searchKeyword ? (
        <div className="mt-12 md:mt-12 xl:mt-12">
          <h2 className="xs:text-2xl-bold mb-4 text-lg-semibold font-semibold text-primary-black-200 sm:text-2xl-bold md:text-2xl-bold">
            "{searchKeyword}"으로 검색한 결과입니다.
          </h2>
          <AllActivities data={searchResults || undefined} />
        </div>
      ) : (
        <>
          <div className="mt-12 md:mt-12 xl:mt-12">
            <h2 className="xs:text-2xl-bold mb-4 text-lg-semibold font-semibold text-primary-black-200 sm:text-2xl-bold md:text-2xl-bold">
              🔥인기 체험
            </h2>
            <PopularActivities data={popularActivities || undefined} />
          </div>
          <div className="mt-12 flex items-center justify-between gap-6 md:mt-32 xl:mt-40">
            <CategoryFilter currentCategory={category} onCategorySelect={handleCategorySelect} />
            <SortFilter onSortSelect={handleSortSelect} />
          </div>
          <div className="mt-8 md:mt-16 xl:mt-24">
            <h2 className="xs:text-2xl-bold my-6 font-semibold text-primary-black-200 sm:text-2xl-bold md:mb-8 md:mt-9">
              {category ? category : "🌍 모든 체험"}
            </h2>
            <AllActivities data={allActivities || undefined} />
          </div>
        </>
      )}

      <div className="mb-30 md:mt-18 my-12 mt-10 flex justify-center md:mb-[165px] xl:mb-[85px] xl:mt-16">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </>
  );
};

export default MainPage;
