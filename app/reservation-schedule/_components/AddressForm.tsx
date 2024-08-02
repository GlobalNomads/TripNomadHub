"use client";
import React from "react";

const AddressForm: React.FC = () => {
  return (
    <div className="flex w-[343px] flex-col items-start rounded-t-md p-0 md:w-[429px] xl:w-[792px]">
      <label htmlFor="title" className="mb-2 text-lg font-semibold">
        주소
      </label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="주소를 입력해주세요"
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default AddressForm;
