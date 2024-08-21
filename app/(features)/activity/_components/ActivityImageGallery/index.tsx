/*
 * 체험상세(activity) 페이지의 갤러리(ActivityImageGallery) 컴포넌트
 * 체험상세 page에서 받아온 정보 중 bannerImage와 subImages의 url을 전달받아 display
 * 성능 최적화를 위해 동적 기능(swiper)이 필요한 모바일 버전의 갤러리를 client component로분리: SwiperContainerClient
 * SkeletonScreen을 적용하면서 Image 컴포넌트를 ImageWithSkeleton 컴포넌트로 전환
 */

import { ImageGalleryProps } from "@/types/activities.type";
import ImageWithSkeleton from "@skeleton/ImageWithSkeleton";
import React from "react";
import SwiperContainerClient from "./SwiperContainerClient";

const ActivityImageGallery: React.FC<ImageGalleryProps> = ({ images, bannerImage }) => {
  const renderGrid = () => {
    switch (images.length) {
      case 0:
        return (
          <div className="relative h-full w-full">
            <ImageWithSkeleton imageUrl={bannerImage} alt="체험 Banner 사진" priority />
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 gap-1">
            <div className="relative" style={{ aspectRatio: "1 / 1" }}>
              <ImageWithSkeleton imageUrl={bannerImage} alt="체험 Banner 사진" priority />
            </div>
            <div className="relative" style={{ aspectRatio: "1 / 1" }}>
              <ImageWithSkeleton imageUrl={images[0]} alt="체험 소개 사진 1" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            <div className="relative col-span-2 row-span-2">
              <ImageWithSkeleton imageUrl={bannerImage} alt="체험 Banner 사진" priority />
            </div>
            <div className="relative col-span-1 row-span-1">
              <ImageWithSkeleton imageUrl={images[0]} alt="체험 소개 사진 1" />
            </div>
            <div className="relative col-span-1 row-span-1">
              <ImageWithSkeleton imageUrl={images[1]} alt="체험 소개 사진 2" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-3 grid-rows-3 gap-1">
            <div className="relative col-span-2 row-span-3">
              <ImageWithSkeleton imageUrl={bannerImage} alt="체험 Banner 사진" priority />
            </div>
            <div className="relative col-span-1 row-span-1">
              <ImageWithSkeleton imageUrl={images[0]} alt="체험 소개 사진 1" />
            </div>
            <div className="relative col-span-1 row-span-1">
              <ImageWithSkeleton imageUrl={images[1]} alt="체험 소개 사진 2" />
            </div>
            <div className="relative col-span-1 row-span-1">
              <ImageWithSkeleton imageUrl={images[2]} alt="체험 소개 사진 3" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-4 grid-rows-2 gap-1">
            <div className="relative col-span-2 row-span-2">
              <ImageWithSkeleton imageUrl={bannerImage} alt="체험 Banner 사진" priority />
            </div>
            {images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative col-span-1 row-span-1">
                <ImageWithSkeleton imageUrl={image} alt={`체험 소개 사진 ${index + 1}`} />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* 모바일 Swiper */}
      <div className="block md:hidden">
        <SwiperContainerClient images={[bannerImage, ...images]} />
      </div>

      {/* 태블릿과 데스크탑 그리드 */}
      <div className="hidden h-[600px] gap-4 md:grid">{renderGrid()}</div>
    </>
  );
};

export default ActivityImageGallery;
