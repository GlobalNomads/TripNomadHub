"use client";

import React from "react";
import CategoryButton from "@button/CategoryButton";

const CATEGORIES = ["문화·예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const CategoryFilter = () => {
  return (
    <div className="relative">
      <div className="no-scrollbar flex gap-4 overflow-x-auto md:gap-8 xl:gap-12">
        {CATEGORIES.map(each => (
          <CategoryButton key={each} className="flex-shrink-0 border border-primary-black-100 text-primary-black-100">
            {each}
          </CategoryButton>
        ))}
        <div className="ml-16"></div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[50px] bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default CategoryFilter;
