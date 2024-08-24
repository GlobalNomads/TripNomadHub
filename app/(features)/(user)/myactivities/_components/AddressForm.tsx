/*
 * 체험 등록 & 수정 - 주소 입력 폼
 */

"use client";
import React from "react";

const AddressForm: React.FC<{ address: string; onAddressChange: (address: string) => void }> = ({
  address,
  onAddressChange,
}) => {
  return (
    <div className="flex w-full max-w-[343px] flex-col items-start rounded-t-md p-0 md:max-w-[429px] xl:max-w-[792px]">
      <label htmlFor="address" className="mb-2 text-[24px] font-semibold">
        주소
      </label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="주소"
        value={address}
        onChange={e => onAddressChange(e.target.value)}
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
    </div>
  );
};

export default AddressForm;

