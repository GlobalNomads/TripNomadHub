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
  const renderGrid = () => {
    if (images.length === 0) {
      return (
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
      );
    }

    const gridLayouts = [
      // Layout for 1 sub image
      {
        grid: "grid-cols-2",
        cells: [
          { colSpan: 1, rowSpan: 1, src: bannerImage },
          { colSpan: 1, rowSpan: 1, src: images[0] },
        ],
      },
      // Layout for 2 sub images
      {
        grid: "grid-cols-3 grid-rows-2",
        cells: [
          { colSpan: 2, rowSpan: 2, src: bannerImage },
          { colSpan: 1, rowSpan: 1, src: images[0] },
          { colSpan: 1, rowSpan: 1, src: images[1] },
        ],
      },
      // Layout for 3 sub images
      {
        grid: "grid-cols-3 grid-rows-3",
        cells: [
          { colSpan: 2, rowSpan: 3, src: bannerImage },
          { colSpan: 1, rowSpan: 1, src: images[0] },
          { colSpan: 1, rowSpan: 1, src: images[1] },
          { colSpan: 1, rowSpan: 1, src: images[2] },
        ],
      },
      // Layout for 4 sub images
      {
        grid: "grid-cols-4 grid-rows-2",
        cells: [
          { colSpan: 2, rowSpan: 2, src: bannerImage },
          ...images.slice(0, 4).map(src => ({ colSpan: 1, rowSpan: 1, src })),
        ],
      },
    ];

    const layout = gridLayouts[images.length - 1];

    return (
      <div className={`grid ${layout.grid} gap-1`}>
        {layout.cells.map(({ colSpan, rowSpan, src }, index) => (
          <div key={index} className={`relative col-span-${colSpan} row-span-${rowSpan}`}>
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* 모바일 Swiper */}
      <div className="block md:hidden">
        <SwiperContainerClient images={[bannerImage, ...images]} />
      </div>

      {/* 태블릿과 데스크탑 그리드 */}
      <div className="hidden h-[600px] md:grid">{renderGrid()}</div>
    </>
  );
};

export default ActivityImageGallery;
