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
    setActiveCategory(newCategory);
    onCategorySelect(newCategory);
  };

  return (
    <div className="relative min-w-0 flex-1">
      <div className="scroll-padding-x-[10px] flex gap-4 overflow-x-auto md:gap-4 xl:gap-6">
        {CATEGORIES.map(category => (
          <CategoryButton
            key={category}
            isActive={activeCategory === category}
            onClick={() => handleClick(category)}
            className={`flex-shrink-0 ${
              activeCategory === category
                ? "bg-primary-green-300 text-white"
                : "bg-white text-black hover:bg-primary-green-300 hover:text-white"
            } transition-colors duration-200`}
          >
            {category}
          </CategoryButton>
        ))}
        <div className="ml-16"></div>
      </div>
      <div className="w-50 pointer-events-none absolute right-0 top-0 h-full bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default CategoryFilter;
