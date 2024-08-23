import deleteIcon from "@icon/ic_delete_24px.svg";
import Image from "next/image";
import React, { ChangeEvent } from "react";

interface ImageUploadFormProps {
  bannerImage: File | null;
  onBannerImageChange: (image: File | null) => void;
  settingImages: File[]; // 디폴트 서브 이미지 배열
  subImages: File[];
  onAddSubImagesChange: (images: File[]) => void;
  onDeleteSubImagesChange: (urls: string[]) => void; // URL 배열을 받는 함수
}

interface ImageItem {
  file: File;
  type: "setting" | "sub";
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  bannerImage,
  onBannerImageChange,
  settingImages,
  subImages,
  onAddSubImagesChange,
  onDeleteSubImagesChange,
}) => {
  // `settingImages`는 디폴트 서브 이미지로 사용
  const defaultSubImageItems: ImageItem[] = settingImages.map(image => ({ file: image, type: "setting" }));
  const addedSubImageItems: ImageItem[] = subImages.map(image => ({ file: image, type: "sub" }));
  const allSubImageItems: ImageItem[] = [...defaultSubImageItems, ...addedSubImageItems];

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onBannerImageChange(e.target.files[0]);
    }
  };

  const handleSubImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (allSubImageItems.length >= 4) {
        alert("소개 이미지는 최대 4개까지 등록 가능합니다."); // 경고 메시지 추가
        return;
      }
      onAddSubImagesChange([...subImages, e.target.files[0]]);
    }
  };

  const removeSubImage = (index: number) => {
    const isDefaultImage = index < defaultSubImageItems.length;
    if (isDefaultImage) {
      // 기본 서브 이미지는 삭제할 수 없으므로 아무 것도 하지 않음
      return;
    }
    const updatedImages = subImages.filter((_, i) => i !== index - defaultSubImageItems.length);
    onAddSubImagesChange(updatedImages);
  };

  return (
    <div className="flex w-full max-w-[342px] flex-col space-y-6 md:max-w-[428px] xl:max-w-[792px]">
      {/* 배너 이미지 섹션 */}
      <div className="flex flex-col space-y-6">
        <label htmlFor="bannerImage" className="mb-2 text-[24px] font-semibold">
          배너 이미지
        </label>
        <div className="flex flex-wrap items-center gap-1 xl:gap-6">
          <div className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px]">
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
            <div className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px]">
              <Image
                src={URL.createObjectURL(bannerImage)}
                alt="배너 이미지"
                width={167}
                height={167}
                className="h-full w-full rounded-[24px] object-cover"
              />
              <button
                type="button"
                className="absolute left-[155px] top-[-10px] flex h-[24px] w-[24px] items-center justify-center opacity-80 md:left-[186px]"
                onClick={() => onBannerImageChange(null)}
              >
                <Image src={deleteIcon} fill alt="삭제 버튼" sizes="24" className="scale-125 transform" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 서브 이미지 섹션 */}
      <div className="flex flex-col space-y-6">
        <label htmlFor="subImages" className="mb-2 text-[24px] font-semibold">
          소개 이미지
        </label>
        <div className="flex flex-wrap items-center gap-1 gap-y-6 xl:gap-6">
          <div className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px]">
            <label className="flex h-full w-full cursor-pointer items-center justify-center rounded-[24px] border border-dashed border-primary-gray-800 text-primary-gray-800">
              <input type="file" id="subImages" onChange={handleSubImageChange} className="hidden" />
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
          {allSubImageItems.map((imageItem, index) => (
            <div key={index} className="relative h-[167px] w-[167px] md:h-[206px] md:w-[206px]">
              <Image
                src={URL.createObjectURL(imageItem.file)}
                alt={`이미지 ${index + 1}`}
                width={167}
                height={167}
                className="h-full w-full rounded-[24px] object-cover"
              />
              {imageItem.type === "sub" && (
                <button
                  type="button"
                  className="absolute left-[155px] top-[-10px] flex h-[24px] w-[24px] items-center justify-center opacity-80 md:left-[186px]"
                  onClick={() => removeSubImage(index)}
                >
                  <Image src={deleteIcon} fill alt="삭제 버튼" sizes="24" className="scale-125 transform" />
                </button>
              )}
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
