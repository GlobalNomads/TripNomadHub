/*
 * 가격 컴포넌트
 */

import React from "react";

interface PriceComponentProps<T> {
  getPrice?: (item: T) => number;
  item: T;
  render?: (formattedPrice: string) => React.ReactNode;
}

const PriceComponent = <T,>({ getPrice, item, render }: PriceComponentProps<T>) => {
  const formattedPrice = getPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KRW",
      }).format(getPrice(item))
    : "";

  return <>{render ? render(formattedPrice) : <span>{formattedPrice}</span>}</>;
};

export default PriceComponent;
