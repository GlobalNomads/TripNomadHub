"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import FilterButton from "@button/FilterButton";

// Dropdown 컴포넌트를 동적으로 로드하고 SSR을 비활성화
const Dropdown = dynamic(() => import("@dropdown/DropDown"), { ssr: false });

const selectOptions: { label: string; value: "latest" | "most_reviewed" | "price_asc" | "price_desc" }[] = [
  { label: "최신 순", value: "latest" },
  { label: "리뷰 많은 순", value: "most_reviewed" },
  { label: "가격이 낮은 순", value: "price_asc" },
  { label: "가격이 높은 순", value: "price_desc" },
];

interface SortFilterProps {
  onSortSelect: (value: "latest" | "most_reviewed" | "price_asc" | "price_desc") => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onSortSelect }) => {
  const [inputLabel, setInputLabel] = useState("최신 순");

  const handleClickListItem = (value: "latest" | "most_reviewed" | "price_asc" | "price_desc", label: string) => {
    setInputLabel(label);
    onSortSelect(value);
  };

  const dropdownItems = selectOptions.map(option => ({
    label: option.label,
    action: () => handleClickListItem(option.value, option.label),
  }));

  return (
    <Dropdown
      items={dropdownItems}
      trigger={
        <FilterButton className="h-[41px] w-[80px] p-[12px] text-lg-medium md:h-[53px] md:w-[127px] md:p-[16px] md:text-2lg-medium whitespace-nowrap">
          {inputLabel}
        </FilterButton>
      }
      dropdownClassName="w-full text-[10px] md:w-auto overflow-y-scroll scroll-smooth max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]"
      itemClassName="text-[10px] sm:text-sm md:text-md-medium lg:text-lg-medium"
    />
  );
};

export default SortFilter;
