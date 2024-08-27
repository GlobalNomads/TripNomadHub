"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import FilterButton from "@button/FilterButton";

// Dropdown 컴포넌트를 동적으로 로드하고 SSR을 비활성화
const Dropdown = dynamic(() => import("@dropdown/DropDown"), { ssr: false });

const selectOptions: { label: string; value: "latest" | "most_reviewed" | "price_asc" | "price_desc" }[] = [
  { label: "최신 순", value: "latest" },
  { label: "리뷰 순", value: "most_reviewed" },
  { label: "가격 ↓", value: "price_asc" },
  { label: "가격 ↑", value: "price_desc" },
];

interface SortFilterProps {
  onSortSelect: (value: "latest" | "most_reviewed" | "price_asc" | "price_desc" | undefined) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onSortSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const defaultLabel = "정렬 ▼";

  const handleClickListItem = (value: "latest" | "most_reviewed" | "price_asc" | "price_desc", label: string) => {
    // 동일한 옵션을 클릭하면 "정렬"로 초기화
    if (selectedOption === value) {
      setSelectedOption(undefined);
      onSortSelect(undefined);
    } else {
      setSelectedOption(value);
      onSortSelect(value);
    }
  };

  const dropdownItems = selectOptions.map(option => ({
    label: option.label,
    action: () => handleClickListItem(option.value, option.label),
  }));

  return (
    <Dropdown
      items={dropdownItems}
      trigger={selectedOption ? selectOptions.find(option => option.value === selectedOption)?.label : defaultLabel}
      dropdownClassName="w-full text-[13px] md:w-auto overflow-y-scroll scroll-smooth max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]"
      itemClassName="!p-1 sm:text-sm md:text-md-medium lg:text-lg-medium md:w-[127px]"
      triggerClassName="border border-primary-black-100 select-none rounded transition-colors duration-200 font-medium flex-shrink-0 h-[41px] w-[80px] rounded-[15px] p-[7px] text-md-medium md:h-[58px] md:w-[120px] md:p-[16px] md:text-2lg-medium xl:h-[58px] xl:w-[127px] xl:p-[16px] xl:text-2lg-medium"
    />
  );
};

export default SortFilter;
