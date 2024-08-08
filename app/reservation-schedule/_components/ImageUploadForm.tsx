/*
    체험 등록 페이지의 이미지 업로드 컴포넌트
    체험 등록에 필요한 이미지를 입력하는 폼
    배너 이미지(필수요소 1장)와 소개 이미지(최대 4장)를 넣어서 사용 
*/

"use client";

import React, { useState } from "react";

const ImageUploadForm: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && introImages.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        setIntroImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeBannerImage = () => {
    setBannerImage(null);
  };

  const removeIntroImage = (index: number) => {
    setIntroImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-[343px] flex-col space-y-6 md:w-[429px] xl:w-[792px]">
      <div className="flex flex-col space-y-6">
        <label htmlFor="bannerImage" className="mb-2 text-[24px] font-semibold">
          배너 이미지
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative h-[180px] w-[180px]">
            <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] border border-dashed border-primary-gray-800 text-primary-gray-800">
              <input type="file" id="bannerImage" onChange={handleBannerChange} className="hidden" />
              <div className="absolute left-1/2 top-[calc(50%-52px)] flex h-[48px] w-[48px] -translate-x-1/2 transform items-center justify-center">
                <svg
                  className="scale-105 transform text-primary-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14"></path>
                </svg>
              </div>

              <span className="absolute left-1/2 top-[calc(50%+39px)] h-[26px] w-[111px] -translate-x-1/2 transform font-['Pretendard'] text-[24px] font-normal leading-[26px] text-primary-gray-800">
                이미지 등록
              </span>
            </label>
          </div>
          {bannerImage && (
            <div className="relative h-[180px] w-[180px]">
              <img src={bannerImage} alt="배너 이미지" className="h-full w-full rounded-[24px] object-cover" />
              <button
                type="button"
                className="absolute left-[160px] top-[-20px] flex h-10 w-10 items-center justify-center rounded-full bg-primary-black-200 text-white opacity-80"
                onClick={removeBannerImage}
              >
                <svg
                  className="h-[24px] w-[24px] scale-125 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <label htmlFor="introImages" className="mb-2 text-[24px] font-semibold">
          소개 이미지
        </label>
        <div className="flex flex-wrap items-center gap-4 gap-y-6">
          <div className="relative h-[180px] w-[180px]">
            <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] border border-dashed border-primary-gray-800 text-primary-gray-800">
              <input type="file" id="introImages" onChange={handleIntroChange} className="hidden" />
              <div className="absolute left-1/2 top-[calc(50%-52px)] flex h-[48px] w-[48px] -translate-x-1/2 transform items-center justify-center">
                <svg
                  className="scale-105 transform text-primary-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14"></path>
                </svg>
              </div>

              <span className="absolute left-1/2 top-[calc(50%+39px)] h-[26px] w-[111px] -translate-x-1/2 transform font-['Pretendard'] text-[24px] font-normal leading-[26px] text-primary-gray-800">
                이미지 등록
              </span>
            </label>
          </div>
          {introImages.map((image, index) => (
            <div key={index} className="relative h-[180px] w-[180px]">
              <img src={image} alt={`소개 이미지 ${index + 1}`} className="h-full w-full rounded-[24px] object-cover" />
              <button
                type="button"
                className="absolute left-[160px] top-[-20px] flex h-10 w-10 items-center justify-center rounded-full bg-primary-black-200 text-white opacity-80"
                onClick={() => removeIntroImage(index)}
              >
                <svg
                  className="h-[24px] w-[24px] scale-125 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[18px] leading-[26px] text-primary-gray-700">
          * 이미지는 최대 4개까지 등록 가능합니다.
        </p>
      </div>
    </div>
  );
};

export default ImageUploadForm;
