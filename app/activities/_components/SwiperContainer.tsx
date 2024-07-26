/*
    체험 상세 페이지의 mobile 버전 이미지 갤러리
*/

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SwiperContainerProps {
  images: string[];
}

const SwiperContainer: React.FC<SwiperContainerProps> = ({ images }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (swiperInstance) {
      const handleProgress = (e: CustomEvent) => {
        console.log(e.detail);
      };

      const handleSlideChange = () => {
        console.log("slide changed");
      };

      swiperInstance.on("progress", handleProgress);
      swiperInstance.on("slideChange", handleSlideChange);

      return () => {
        swiperInstance.off("progress", handleProgress);
        swiperInstance.off("slideChange", handleSlideChange);
      };
    }
  }, [swiperInstance]);

  return (
    <Swiper
      onSwiper={swiper => setSwiperInstance(swiper)}
      modules={[Navigation, Pagination, Scrollbar]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation
      scrollbar={{ draggable: true }}
      loop
      style={{ width: "100%", height: "310px" }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Slide ${index + 1}`} className="h-full w-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperContainer;
