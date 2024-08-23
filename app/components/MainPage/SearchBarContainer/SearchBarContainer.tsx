import React, { useState } from "react";
import SearchBar from "../SearchBar";
import { ActivitiesData } from "@/types/activities.type";
import getActivities from "@/api/Activities/getActivities";

interface SearchBarContainerProps {
  onSearchComplete: (results: ActivitiesData | undefined, searching: boolean, pages: number, keyword?: string) => void;
}

const SearchBarContainer = ({ onSearchComplete }: SearchBarContainerProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string | undefined>(undefined);

  // 검색 결과 fetch
  const fetchSearchResults = async (keyword: string) => {
    try {
      const data = await getActivities({
        method: "offset",
        sort: "latest",
        page: 1, // 기본적으로 첫 페이지로 검색
        size: 20, // 검색 결과 페이지 당 크기 설정
        keyword: keyword,
      });
      onSearchComplete(data, true, Math.ceil(data.totalCount / 20), keyword);  // 검색 결과 전달
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      onSearchComplete(undefined, false, 0);  // 실패 시 초기화
    }
  };

  // 검색 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword || undefined);
    if (keyword) {
      fetchSearchResults(keyword);  // 검색어가 있을 경우 검색 실행
    } else {
      onSearchComplete(undefined, false, 0);  // 검색어가 없을 경우 초기화
    }
  };

  return (
    <SearchBar onSearch={handleSearch} />
  );
};

export default SearchBarContainer;
