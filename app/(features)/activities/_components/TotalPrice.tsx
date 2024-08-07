/*
  체험 예약 총 금액
*/
import React from "react";

interface TotalPriceProps {
  price: number;
  count: number;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ price, count }) => {
  const totalPrice = price * count;
  const formattedTotalPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "KRW" }).format(totalPrice);

  return (
    <div className="flex justify-between text-xl-bold text-primary-black-100">
      <h3>총 합계</h3>
      <div>{formattedTotalPrice}</div>
    </div>
  );
};

export default TotalPrice;
