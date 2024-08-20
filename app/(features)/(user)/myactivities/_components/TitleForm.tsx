"use client";
import Button from "@/components/Button/Button";
import React, { useState } from "react";

const categories = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const TitleForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex w-full max-w-[343px] flex-col items-start rounded-t-md p-0 md:max-w-[429px] xl:max-w-[792px]">
      <div className="mb-4 flex w-full items-center justify-between">
        <label htmlFor="title" className="font-pretendard text-[32px] font-bold leading-[42px]">
          내 체험 등록
        </label>
        <div className="flex flex-1 items-center justify-end">
          <Button.Default
            type="nomadBlack"
            className="flex h-[48px] w-[120px] items-center justify-center p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
            onClick={() => alert("nomadBlack Button Clicked")}
          >
            등록하기
          </Button.Default>
        </div>
      </div>

      <input
        type="text"
        id="title"
        name="title"
        placeholder="제목"
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />

      <label htmlFor="category" className="mb-2 text-lg font-semibold"></label>
      <div className="relative mb-4 h-[56px] w-full">
        <select
          id="category"
          name="category"
          className={`h-full w-full appearance-none rounded border border-gray-700 px-3 py-2 text-lg leading-[42px] ${
            selectedCategory ? "text-primary-black-200" : "text-primary-gray-700"
          }`}
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ fontSize: "16px", lineHeight: "24px" }}
        >
          <option value="" disabled className="text-gray-400">
            카테고리
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category} className="text-lg" style={{ fontSize: "16px", lineHeight: "24px" }}>
              {category}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
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

      <label htmlFor="description" className="mb-2 text-lg font-semibold"></label>
      <textarea
        id="description"
        name="description"
        placeholder="설명"
        className="h-[346px] w-full rounded border border-gray-700 px-3 py-2 text-lg placeholder-gray-500"
      />
    </div>
  );
};

export default TitleForm;
