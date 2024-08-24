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
    <div className="w-full max-w-[343px] md:max-w-[429px] xl:max-w-[792px]">
      <label htmlFor="description" className="mb-2 text-lg font-semibold"></label>
      <textarea
        id="description"
        name="description"
        placeholder="설명"
        value={description}
        onChange={e => onDescriptionChange(e.target.value)}
        className="h-[346px] w-full rounded border border-gray-700 px-3 py-2 text-lg placeholder-gray-500"
      />
    </div>
  );
};

export default DescriptionForm;
