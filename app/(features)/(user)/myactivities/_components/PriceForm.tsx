/*
 * 체험 등록 & 수정 - 체험 가격 등록 폼
 */

"use client";
import React from "react";

const PriceForm: React.FC<{ price: number; onPriceChange: (price: number) => void }> = ({ price, onPriceChange }) => {
  return (
    <div className="flex w-full max-w-[343px] flex-col items-start rounded-t-md p-0 md:max-w-[429px] xl:max-w-[792px]">
      <label htmlFor="price" className="mb-2 pt-4 text-[24px] font-semibold">
        가격
      </label>
      <input
        type="number"
        id="price"
        name="price"
        placeholder="가격"
        value={price}
        onChange={e => onPriceChange(Number(e.target.value))}
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default PriceForm;
