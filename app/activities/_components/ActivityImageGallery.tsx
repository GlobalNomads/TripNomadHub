/*
    체험상세(activities) 페이지의 갤러리(ActivityImageGallery) 컴포넌트
    체험상세 page에서 받아온 정보 중 bannerImage와 subImages의 url을 전달받아 display
    Todo: API 연결 - 현재 mock data와 연동되어있음
*/

"use client";

import dynamic from "next/dynamic";
import React from "react";

// SwiperContainer를 동적으로 가져옵니다.
const DynamicSwiperContainer = dynamic(() => import("./SwiperContainer"), { ssr: false });

interface ImageGalleryProps {
  images: string[];
  bannerImage: string;
}

const ActivityImageGallery: React.FC<ImageGalleryProps> = ({ images, bannerImage }) => {
  return (
    <>
      {/* 모바일 Swiper */}
      <div className="block md:hidden xl:hidden">
        <DynamicSwiperContainer images={[bannerImage, ...images]} />
      </div>

      {/* 태블릿과 데스크탑 그리드 */}
      <div className="hidden h-[600px] grid-cols-4 grid-rows-2 gap-4 md:grid xl:grid">
        <div className="col-span-2 row-span-2">
          <img src={bannerImage} alt="Banner" className="h-full w-full object-cover" />
        </div>
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative h-full">
            <img src={image} alt={`Image ${index + 1}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivityImageGallery;