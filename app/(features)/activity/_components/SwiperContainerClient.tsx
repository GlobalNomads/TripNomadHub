"use client";

import dynamic from "next/dynamic";
import React from "react";

// SwiperContainer를 동적으로 가져오기
const DynamicSwiperContainer = dynamic(() => import("./SwiperContainer"), { ssr: false });

interface SwiperContainerClientProps {
  images: string[];
}

const SwiperContainerClient: React.FC<SwiperContainerClientProps> = ({ images }) => {
  return <DynamicSwiperContainer images={images} />;
};

export default SwiperContainerClient;
