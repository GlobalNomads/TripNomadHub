/*
    체험 등록 페이지의 가격(Price) 컴포넌트
    체험 등록에 필요한 가격을 입력하는 폼
*/
"use client";
import React from "react";

const PriceForm: React.FC = () => {
  return (
    <div className="flex w-[343px] flex-col items-start rounded-t-md p-0 md:w-[429px] xl:w-[792px]">
      <label htmlFor="title" className="mb-2 text-lg font-semibold">
        가격
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="가격"
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default PriceForm;
