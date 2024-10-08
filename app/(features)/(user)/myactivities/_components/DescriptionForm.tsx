/*
 * 체험 등록 & 수정 - 체험 설명 작성 폼
 */

"use client";
import React from "react";

const DescriptionForm: React.FC<{ description: string; onDescriptionChange: (description: string) => void }> = ({
  description,
  onDescriptionChange,
}) => {
  return (
    <div>
      <label htmlFor="description" className="mb-2 text-lg font-semibold"></label>
      <textarea
        id="description"
        name="description"
        placeholder="설명"
        value={description}
        onChange={e => onDescriptionChange(e.target.value)}
        className="h-[346px] w-[343px] rounded border border-gray-700 px-3 py-2 text-lg placeholder-gray-500 sm:w-[343px] md:w-[429px] xl:w-[792px]"
      />
    </div>
  );
};

export default DescriptionForm;
