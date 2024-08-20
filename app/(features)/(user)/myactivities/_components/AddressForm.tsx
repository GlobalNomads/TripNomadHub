/*
    체험 등록 페이지의 주소(Address) 컴포넌트
    체험 등록에 필요한 주소를 입력하는 폼
*/
"use client";
import React from "react";

const AddressForm: React.FC = () => {
  return (
    <div className="flex w-full max-w-[343px] flex-col items-start rounded-t-md p-0 md:max-w-[429px] xl:max-w-[792px]">
      <label htmlFor="title" className="mb-2 text-[24px] font-semibold">
        주소
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="주소"
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default AddressForm;
