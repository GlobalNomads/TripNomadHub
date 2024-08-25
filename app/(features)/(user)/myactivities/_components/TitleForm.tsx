/*
 * 체험 등록 & 수정 - 체험 제목 작성 폼
 */

"use client";
import React from "react";

const TitleForm: React.FC<{ title: string; onTitleChange: (title: string) => void }> = ({ title, onTitleChange }) => {
  return (
    <input
      type="text"
      id="title"
      name="title"
      placeholder="제목"
      value={title}
      onChange={e => onTitleChange(e.target.value)}
      className="mb-4 h-[56px] w-full max-w-[343px] rounded border border-gray-700 px-3 py-2 placeholder-gray-500 md:max-w-[429px] xl:max-w-[792px]"
    />
  );
};

export default TitleForm;