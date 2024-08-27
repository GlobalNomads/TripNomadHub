import React, { useState, useCallback } from "react";
import debounce from "@/utils/debounce"; // Import your custom debounce utility
import SearchBar from "./SearchBar";
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
        page: 1,
        size: 20,
        keyword: keyword,
      });
      onSearchComplete(data, true, Math.ceil(data.totalCount / 20), keyword); // 검색 결과 전달
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      onSearchComplete(undefined, false, 0); // 실패 시 초기화
    }
  };

  // Using your custom debounce utility
  const debouncedFetchSearchResults = useCallback(
    debounce((keyword: string) => fetchSearchResults(keyword), 300),
    [], // Empty dependencies array to ensure debounce is created once
  );

  // 검색 핸들러
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword || undefined);
    if (keyword) {
      debouncedFetchSearchResults(keyword); // Debounced search execution
    } else {
      onSearchComplete(undefined, false, 0); // 검색어가 없을 경우 초기화
    }
  };

  return <SearchBar onSearch={handleSearch} />;
};

export default SearchBarContainer;
