"use client";

import React, { useState, useEffect } from "react";
import CategoryButton from "@button/CategoryButton";

type CategoryType = "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙" | undefined;

const CATEGORIES: CategoryType[] = ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

const CategoryFilter = ({
  currentCategory,
  onCategorySelect,
}: {
  currentCategory: CategoryType;
  onCategorySelect: (category: CategoryType) => void;
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(currentCategory);

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory]);

  const handleClick = (category: CategoryType) => {
    const newCategory = activeCategory === category ? undefined : category;
    setActiveCategory(newCategory); // activeCategory 업데이트
    onCategorySelect(newCategory);
  };

  return (
    <div className="relative min-w-0 flex-1">
      <div className="flex gap-4 overflow-x-auto md:gap-8 xl:gap-8">
        {CATEGORIES.map(category => (
          <CategoryButton
            key={category}
            isActive={activeCategory === category}
            onClick={() => handleClick(category)}
            className="h-[41px] w-[80px] flex-shrink-0 p-[12px] text-lg-medium md:h-[53px] md:w-[127px] md:p-[16px] md:text-2lg-medium"
          >
            {category}
          </CategoryButton>
        ))}
        <div className="ml-16"></div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[50px] bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default CategoryFilter;
