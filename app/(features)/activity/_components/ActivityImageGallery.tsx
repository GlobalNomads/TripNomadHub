/*
 *체험상세(activity) 페이지의 갤러리(ActivityImageGallery) 컴포넌트
 *체험상세 page에서 받아온 정보 중 bannerImage와 subImages의 url을 전달받아 display
 *성능 최적화를 위해 동적 기능(swiper)이 필요한 모바일 버전의 갤러리를 client component로분리함: SwiperContainerClient
 */

import { ImageGalleryProps } from "@/types/activities.type";
import Image from "next/image";
import React from "react";
import SwiperContainerClient from "./SwiperContainerClient";

const ActivityImageGallery: React.FC<ImageGalleryProps> = ({ images, bannerImage }) => {
  return (
    <>
      {/* 모바일 Swiper */}
      <div className="block md:hidden">
        <SwiperContainerClient images={[bannerImage, ...images]} />
      </div>

      {/* 태블릿과 데스크탑 그리드 */}
      <div className="hidden h-[600px] grid-cols-4 grid-rows-2 gap-4 md:grid">
        <div className="relative col-span-2 row-span-2">
          <Image
            src={bannerImage}
            alt="Banner"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {images.slice(0, 4).map((image, index) => (
          <div key={index} className="relative h-full">
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivityImageGallery;
