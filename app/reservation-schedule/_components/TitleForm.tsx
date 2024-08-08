/*
    체험 등록 페이지의 타이틀 컴포넌트
    체험 등록에 필요한 제목, 카테고리, 설명 입력하는 폼
*/

"use client";
import React, { useState } from "react";

const categories = ["문화 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const TitleForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex w-[343px] flex-col items-start rounded-t-md p-0 md:w-[429px] xl:w-[792px]">
      <label htmlFor="title" className="mb-2 text-lg font-semibold"></label>
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
          className={`h-full w-full appearance-none rounded border border-gray-700 px-3 py-2 ${
            selectedCategory ? "text-primary-black-200" : "text-primary-gray-700"
          }`}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            카테고리
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
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
        className="h-[346px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default TitleForm;
