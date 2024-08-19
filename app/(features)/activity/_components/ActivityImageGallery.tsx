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
      <div className="hidden h-[600px] gap-4 md:grid">
        {/* case1: 배너 이미지만 존재 */}
        {images.length === 0 && (
          <div className="relative h-full w-full">
            <Image
              src={bannerImage}
              alt="Banner"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* case2: 배너 이미지 + sub 이미지 1개 */}
        {images.length === 1 && (
          <div className="grid grid-cols-2 gap-1">
            <div className="relative" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={bannerImage}
                alt="Banner"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative" style={{ aspectRatio: "1 / 1" }}>
              <Image
                src={images[0]}
                alt="SubImage 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}

        {/* case3: 배너 이미지 + sub 이미지 2개 */}
        {images.length === 2 && (
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
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
            <div className="relative col-span-1 row-span-1">
              <Image
                src={images[0]}
                alt="SubImage 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1">
              <Image
                src={images[1]}
                alt="SubImage 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}

        {/* case4: 배너 이미지 + sub 이미지 3개 */}
        {images.length === 3 && (
          <div className="grid grid-cols-3 grid-rows-3 gap-1">
            {/* 배너 이미지: 왼쪽 전체를 차지 */}
            <div className="relative col-span-2 row-span-3">
              <Image
                src={bannerImage}
                alt="Banner"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1">
              <Image
                src={images[0]}
                alt="SubImage 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1">
              <Image
                src={images[1]}
                alt="SubImage 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="relative col-span-1 row-span-1">
              <Image
                src={images[2]}
                alt="SubImage 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        )}

        {/* case5: 배너 이미지 + sub 이미지 4개 */}
        {images.length === 4 && (
          <div className="grid grid-cols-4 grid-rows-2 gap-1">
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
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`SubImage ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityImageGallery;
