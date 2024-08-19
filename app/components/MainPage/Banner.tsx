'use client';

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import dancer from "@image/dancer.png";
import otherImage1 from "@image/forest.png";
import otherImage2 from "@image/mountain.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Banner = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const currentMonth = selectedDate ? selectedDate.toLocaleString("ko-KR", { month: "long" }) : "";

  // 슬라이드 데이터
  const slides = [
    {
      image: dancer,
      title: "함께 배우면 즐거운\n스트릿 댄스",
    },
    {
      image: otherImage1,
      title: "자연 속에서의\n힐링 체험",
    },
    {
      image: otherImage2,
      title: "산 속에서의\n모험과 탐험",
    },
  ];

  return (
    <div className="relative h-96 w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image src={slide.image} alt={slide.title} fill={true} style={{ objectFit: "cover" }} quality={100} priority />
            <div className="absolute inset-0 bg-primary-black-200 opacity-50"></div>
            <div className="main-layout absolute inset-0 flex flex-col items-start justify-center pl-10 text-white">
              <h1 className="text-3xl-bold md:text-3xl-bold whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="mt-4 text-lg-regular md:text-2xl-regular">{currentMonth}의 인기 체험 BEST 🔥</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 달력 */}
      <div className="absolute bottom-20 left-1/2 w-full max-w-screen-lg -translate-x-1/2 transform px-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM"
          showMonthYearPicker
          className="text-black"
        />
      </div>
    </div>
  );
};

export default Banner;