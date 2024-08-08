/*
    체험 예약 총 금액 정보
*/
import { PriceInfoProps } from "@/types/activities.type";
import React from "react";

const PriceInfo: React.FC<PriceInfoProps> = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "KRW" }).format(price);

  return (
    <div>
      <div>
        <span className="text-xl-regular text-primary-black-200 md:text-2xl-bold xl:text-3xl-bold">
          {formattedPrice}
        </span>
        <span className="text-lg-regular text-primary-gray-800 md:text-2lg-bold xl:text-xl-regular">/인</span>
      </div>
    </div>
  );
};

export default PriceInfo;
