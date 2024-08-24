import miniStar from "@icon/mini_star.svg";
import Image from "next/image";
import React from "react";

// <1> 이미지 컴포넌트
const ImageComponent = <T,>({ getImageUrl, item }: { getImageUrl: (item: T) => string; item: T }) => (
  <div className="relative h-[128px] w-[128px] flex-shrink-0 overflow-hidden rounded-l-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]">
    <Image src={getImageUrl(item)} priority layout="fill" objectFit="cover" alt="체험 배너 사진" />
  </div>
);

// <2> 카테고리 또는 평점 컴포넌트
const RatingComponent = <T,>({
  getRating,
  getReviewCount,
  getCategory,
  item,
}: {
  getRating?: (item: T) => number;
  getReviewCount?: (item: T) => number;
  getCategory?: (item: T) => string;
  item: T;
}) => (
  <div className="text-sm-semibold text-primary-black-200 md:text-md-semibold xl:text-lg-semibold">
    {getCategory ? (
      <span>{getCategory(item)}</span>
    ) : getRating && getReviewCount ? (
      <span className="flex items-center space-x-[4px] md:space-x-[6px]">
        <Image src={miniStar} alt="rating" width={19} height={19} />
        <span className="font-bold">{getRating(item)}</span>
        <span className="text-primary-gray-800">({getReviewCount(item)})</span>
      </span>
    ) : null}
  </div>
);

// <3> 제목 컴포넌트
const TitleComponent = <T,>({ getTitle, item }: { getTitle: (item: T) => string; item: T }) => (
  <div className="text-md-bold md:text-lg-bold xl:text-xl-bold">{getTitle(item)}</div>
);

// <4> 서브타이틀 컴포넌트
const SubtitleComponent = <T,>({ getSubtitle, item }: { getSubtitle?: (item: T) => string; item: T }) => (
  <div className="md:text-sm-regular text-xs-regular xl:text-[18px]">
    {getSubtitle ? getSubtitle(item) : <>&nbsp;</>}
  </div>
);

import PriceComponent from "./PriceComponent";

// <5> 가격 및 자식 컴포넌트
const PriceAndChildrenComponent = <T,>({
  getPrice,
  children,
  item,
}: {
  getPrice?: (item: T) => number;
  children?: React.ReactNode;
  item: T;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <PriceComponent
        getPrice={getPrice}
        item={item}
        render={formattedPrice => (
          <div className="flex items-center text-lg-semibold text-primary-gray-800 md:text-xl-semibold xl:text-2xl-semibold">
            <span>{formattedPrice}</span>
            <span className="md:text-lg-16px-medium ml-1 text-md-regular text-gray-500 xl:text-lg-medium">/인</span>
          </div>
        )}
      />
      {children}
    </div>
  );
};

interface ReservationCardProps<T> {
  reservations: T[];
  getImageUrl: (item: T) => string;
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  getRating?: (item: T) => number;
  getReviewCount?: (item: T) => number;
  getCategory?: (item: T) => string;
  getPrice?: (item: T) => number;
  children?: (reservation: T) => React.ReactNode;
}

const ReservationCard = <T,>({
  reservations,
  getImageUrl,
  getTitle,
  getSubtitle,
  getRating,
  getReviewCount,
  getCategory,
  getPrice,
  children,
}: ReservationCardProps<T>) => {
  return (
    <div className="mx-auto flex flex-col gap-2 md:w-[429px] md:gap-4 xl:w-[792px] xl:gap-6">
      {reservations.map((reservation, index) => (
        <div
          key={index}
          className="flex h-[128px] rounded-3xl border border-solid border-gray-300 bg-white md:h-[156px] xl:h-[204px]"
        >
          {/* <1> 이미지 컴포넌트 */}
          <ImageComponent getImageUrl={getImageUrl} item={reservation} />
          <div className="ml-2 mr-3 mt-[11px] grid w-full md:ml-3 md:mt-[12px] xl:ml-6 xl:mt-[21px] xl:h-[162px]">
            <div className="grid gap-1 md:gap-[0px] xl:gap-[12px]">
              {/* <2> 카테고리 또는 평점 컴포넌트 */}
              <RatingComponent
                getRating={getRating}
                getReviewCount={getReviewCount}
                getCategory={getCategory}
                item={reservation}
              />
              {/* <3> 제목 컴포넌트 */}
              <TitleComponent getTitle={getTitle} item={reservation} />
              {/* <4> 서브타이틀 컴포넌트 */}
              <SubtitleComponent getSubtitle={getSubtitle} item={reservation} />
              {/* <5> 가격 및 자식 컴포넌트 */}
              <PriceAndChildrenComponent getPrice={getPrice} item={reservation}>
                {children && children(reservation)}
              </PriceAndChildrenComponent>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationCard;
