"use client";

import SkeletonBox from "@skeleton/SkeletonBox";
import dynamic from "next/dynamic";
import React from "react";

// SwiperContainer를 동적으로 가져오기
const DynamicSwiperContainer = dynamic(() => import("./SwiperContainer"), {
  ssr: false,
  loading: () => <SkeletonBox width="100%" height="300px" />, // 로딩 중 Skeleton 표시
});

interface SwiperContainerClientProps {
  images: string[];
}

const SwiperContainerClient: React.FC<SwiperContainerClientProps> = ({ images }) => {
  return <DynamicSwiperContainer images={images} />;
};

export default SwiperContainerClient;
