/*
 * 체험 등록 & 수정 - 이미지 등록 폼
 */
"use client";

import Image from "next/image";
import React, { ChangeEvent, useRef } from "react";

interface ImageUploadFormProps {
  bannerImage: File | null;
  onBannerImageChange: (image: File | null) => void;
  subImages: File[];
  onSubImagesChange: (images: File[]) => void;
}

const ImageUploadForm = ({ bannerImage, onBannerImageChange, subImages, onSubImagesChange }: ImageUploadFormProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const subImageInputRef = useRef<HTMLInputElement>(null);

  const handleBannerChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      onBannerImageChange(target.files[0]);
    }
  };

  const handleSubImageChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      if (subImages.length >= 4) {
        alert("소개 이미지는 최대 4개까지 등록 가능합니다.");
        return;
      }
      onSubImagesChange([...subImages, target.files[0]]);
    }
  };

  const removeBannerImage = () => {
    onBannerImageChange(null);
  };

  const removeSubImage = (index: number) => {
    const updatedImages = subImages.filter((_, i) => i !== index);
    onSubImagesChange(updatedImages);
  };

  return (
    <div className="flex w-full max-w-[342px] flex-col space-y-6 md:max-w-[428px] xl:max-w-[792px]">
      {/* 배너 이미지 섹션 */}
      <div className="flex flex-col space-y-6">
        <label className="mb-2 text-2xl-semibold">배너 이미지</label>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px] xl:h-[180px] xl:w-[180px]">
            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] border border-dashed border-primary-gray-800 text-primary-gray-800"
            >
              <input type="file" ref={bannerInputRef} onChange={handleBannerChange} className="hidden" />
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
            </button>
          </div>
          {bannerImage && (
            <div className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px] xl:h-[180px] xl:w-[180px]">
              <Image
                src={URL.createObjectURL(bannerImage)}
                alt="배너 이미지"
                width={167}
                height={167}
                className="h-full w-full rounded-[24px] object-cover"
              />
              <button
                type="button"
                className="absolute left-[147px] top-[-20px] flex h-10 w-10 items-center justify-center rounded-full bg-primary-black-200 text-white opacity-80 md:left-[186px] xl:left-[160px]"
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

      {/* 서브 이미지 섹션 */}
      <div className="flex flex-col space-y-6">
        <label className="mb-2 text-2xl-semibold">소개 이미지</label>
        <div className="flex flex-wrap items-center gap-2 gap-y-6 md:gap-4">
          <div className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px] xl:h-[180px] xl:w-[180px]">
            <button
              type="button"
              onClick={() => subImageInputRef.current?.click()}
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] border border-dashed border-primary-gray-800 text-primary-gray-800"
            >
              <input type="file" ref={subImageInputRef} onChange={handleSubImageChange} className="hidden" />
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
            </button>
          </div>
          {subImages.map((image, index) => (
            <div
              key={index}
              className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px] xl:h-[180px] xl:w-[180px]"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`소개 이미지 ${index + 1}`}
                width={167}
                height={167}
                className="h-full w-full rounded-[24px] object-cover"
              />
              <button
                type="button"
                className="absolute left-[147px] top-[-20px] flex h-10 w-10 items-center justify-center rounded-full bg-primary-black-200 text-white opacity-80 md:left-[186px] xl:left-[160px]"
                onClick={() => removeSubImage(index)}
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
