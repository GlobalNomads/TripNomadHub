/*
 * 체험 등록 & 수정 - 체험 가격 등록 폼
 */

import React, { ChangeEvent } from "react";

// 숫자를 3자리마다 쉼표를 추가하는 함수
const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

// 쉼표를 제거하고 숫자만 추출하는 함수
const parseNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, ""));
};

const PriceForm = ({ price, onPriceChange }: { price: number; onPriceChange: (price: number) => void }) => {
  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const formattedValue = target.value;
    const numericValue = parseNumber(formattedValue);
    onPriceChange(numericValue);
  };

  return (
    <div className="flex w-full max-w-[343px] flex-col items-start rounded-t-md p-0 md:max-w-[429px] xl:max-w-[792px]">
      <label htmlFor="price" className="mb-2 pt-4 text-[24px] font-semibold">
        가격
      </label>
      <input
        type="text"
        id="price"
        name="price"
        placeholder="가격"
        value={formatNumber(price)}
        onChange={handleChange}
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default PriceForm;
