"use client";

import React, { useState, useEffect, useRef } from "react";
import Postcode from "react-daum-postcode";
import Image from "next/image";
import closeIcon from "@/assets/icon/ic_btn_X.svg"; // 닫기 버튼 아이콘

interface AddressFormProps {
  address: string;
  onAddressChange: (address: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onAddressChange }) => {
  const [isPostcodeVisible, setIsPostcodeVisible] = useState(false);
  const postcodeRef = useRef<HTMLDivElement | null>(null);

  const handleAddressChange = (address: string) => {
    onAddressChange(address);
    setIsPostcodeVisible(false); // 주소 입력 후 팝업 닫기
  };

  const togglePostcode = () => {
    setIsPostcodeVisible(prev => !prev);
  };

  const handleClickOutside: EventListener = event => {
    if (postcodeRef.current && !postcodeRef.current.contains(event.target as Node)) {
      setIsPostcodeVisible(false);
    }
  };

  useEffect(() => {
    if (isPostcodeVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPostcodeVisible]);

  return (
    <div className="relative flex w-full max-w-[343px] flex-col items-start rounded-t-md p-0 md:max-w-[429px] xl:max-w-[792px]">
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
        onFocus={() => setIsPostcodeVisible(true)}
        className="mb-4 h-[56px] w-full rounded border border-gray-700 px-3 py-2 placeholder-gray-500"
      />
      {isPostcodeVisible && (
        <div
          ref={postcodeRef}
          className="absolute left-0 top-full z-50 mt-2 w-full max-w-[429px] rounded border border-gray-700 bg-white shadow-lg xl:max-w-[792px]"
        >
          <button type="button" onClick={togglePostcode} className="absolute right-2 top-2">
            <Image src={closeIcon} alt="닫기 아이콘" width={24} height={24} />
          </button>
          <Postcode
            onComplete={(data: { address: string; bname: string }) =>
              handleAddressChange(`${data.address} (${data.bname})`)
            }
            autoClose={false}
          />
        </div>
      )}
    </div>
  );
};

export default AddressForm;
