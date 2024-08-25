"use client";

import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";
import PopularActivities from "./PopularActivities/PopularActivities";
import AllActivities from "./AllActivities/AllActivities";
import SearchBarContainer from "./SearchBarContainer/SearchBarContainer";
import { ActivitiesData } from "@/types/activities.type";

// CategoryType 타입 정의
export type CategoryType = "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙" | undefined;

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchResults, setSearchResults] = useState<ActivitiesData | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined); // 검색어 상태 추가
  const [sort, setSort] = useState<"latest" | "most_reviewed" | "price_asc" | "price_desc">("latest");
  const [category, setCategory] = useState<CategoryType>(undefined);

  const handleSearchComplete = (
    results: ActivitiesData | undefined,
    searching: boolean,
    pages: number,
    keyword?: string,
  ) => {
    setSearchResults(results);
    setIsSearching(searching);
    setSearchKeyword(keyword || undefined); // 검색 키워드 상태 설정
    setTotalPages(pages);
    setCurrentPage(1); // 검색이 완료되면 페이지를 1로 초기화
    setCategory(undefined); // 카테고리 초기화
    setSort("latest"); // 정렬 초기화
  };

  const handleCategorySelect = (category: CategoryType) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const handleSortSelect = (sortOption: "latest" | "most_reviewed" | "price_asc" | "price_desc") => {
    setSort(sortOption);
    setCurrentPage(1);
  };

  const renderSearchResults = () => (
    <div className="mt-12 md:mt-12 xl:mt-12">
      {/* 검색어와 결과 개수를 표시하는 부분 */}
      <h2 className="xs:text-2xl-bold mb-4 text-lg-semibold font-semibold text-primary-black-200 sm:text-2xl-bold md:text-2xl-bold">
        "{searchKeyword}"으로 검색한 결과입니다.
      </h2>
      <p className="text-sm text-gray-500">총 {searchResults?.totalCount || 0}개의 결과</p>

      {/* 검색 결과가 있을 경우 */}
      {searchResults?.activities.length ? (
        <AllActivities
          currentPage={currentPage}
          searchKeyword={searchKeyword}
          category={undefined}
          sort="latest"
          setTotalPages={setTotalPages}
        />
      ) : (
        <p className="text-center text-lg text-gray-500">검색된 결과가 없습니다.</p>
      )}
    </div>
  );

  const renderDefaultContent = () => (
    <>
      <div className="mt-12 md:mt-12 xl:mt-12">
        <PopularActivities />
      </div>
      <div className="mt-12 flex items-center justify-between gap-6 md:mt-32 xl:mt-40">
        <CategoryFilter currentCategory={category} onCategorySelect={handleCategorySelect} />
        <SortFilter onSortSelect={handleSortSelect} />
      </div>
      <div className="mt-8 md:mt-16 xl:mt-24">
        <AllActivities
          currentPage={currentPage}
          searchKeyword={undefined}
          category={category}
          sort={sort}
          setTotalPages={setTotalPages}
        />
      </div>
    </>
  );

  return (
    <>
      <SearchBarContainer onSearchComplete={handleSearchComplete} />
      {isSearching ? renderSearchResults() : renderDefaultContent()}
      <div className="mb-30 md:mt-18 my-12 mt-10 flex justify-center md:mb-[165px] xl:mb-[85px] xl:mt-16">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </>
  );
};

export default MainPage;
