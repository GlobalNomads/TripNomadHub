/*
 * 체험 등록 & 수정 - 카테고리 선택 폼
 */

"use client";
import React from "react";

const categories = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const CategorySelect: React.FC<{ category: string; onCategoryChange: (category: string) => void }> = ({
  category,
  onCategoryChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  return (
    <div className="relative mb-4 h-[56px] w-[343px] sm:w-[343px] md:w-[429px] xl:w-[792px]">
      <select
        id="category"
        name="category"
        className={`h-full w-full appearance-none rounded border border-gray-700 px-3 py-2 text-lg leading-[42px] ${
          category ? "text-primary-black-200" : "text-primary-gray-700"
        }`}
        value={category}
        onChange={handleCategoryChange}
        style={{ fontSize: "16px", lineHeight: "24px" }}
      >
        <option value="" disabled className="text-gray-400">
          카테고리
        </option>
        {categories.map((cat, index) => (
          <option key={index} value={cat} className="text-lg" style={{ fontSize: "16px", lineHeight: "24px" }}>
            {cat}
          </option>
        ))}
      </select>
      {/* 화살표 버튼을 추가하는 부분 */}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  );
};

export default CategorySelect;
