/*
 * 체험 등록(activity-registration) 페이지
 */

"use client";
import postActivities from "@/api/Activities/postActivities";
import postActivitiesImg from "@/api/Activities/postActivitiesImg";
import { ActivitiesIdData } from "@/types/myActivities.type";
import Button from "@button/Button";
import { useState } from "react";
import AddressForm from "../_components/AddressForm";
import CategorySelect from "../_components/CategorySelect";
import DescriptionForm from "../_components/DescriptionForm";
import ImageUploadForm from "../_components/ImageUploadForm";
import PriceForm from "../_components/PriceForm";
import ScheduleForm from "../_components/ScheduleForm";
import TitleForm from "../_components/TitleForm";

function ActivityRegistration() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [schedules, setSchedules] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [bannerImage, setBannerImage] = useState<File | null>(null); // 파일 타입으로 관리
  const [subImages, setSubImages] = useState<File[]>([]); // 파일 타입으로 관리
  const [bannerImageUrl, setBannerImageUrl] = useState<string>("");
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      // 배너 이미지 업로드
      if (bannerImage) {
        const uploadedBannerImage = await postActivitiesImg(bannerImage);
        setBannerImageUrl(uploadedBannerImage.activityImageUrl);
      }

      // 서브 이미지 업로드
      const uploadedSubImages = await Promise.all(
        subImages.map(async image => {
          const uploadedImage = await postActivitiesImg(image);
          return uploadedImage.activityImageUrl;
        }),
      );
      setSubImageUrls(uploadedSubImages);

      // 최종 데이터 수집
      const formData: ActivitiesIdData = {
        title,
        category,
        description,
        address,
        price,
        schedules,
        bannerImageUrl,
        subImageUrls: subImageUrls.map(url => ({ imageUrl: url })), // 'url'을 'imageUrl'로 변환
      };

      // API 호출
      const response = await postActivities(formData);
      console.log("등록 성공:", response);
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="font-pretendard text-[32px] font-bold leading-[42px]">내 체험 등록</h1>
        <Button.Default
          type="nomadBlack"
          className="flex h-[48px] w-[120px] items-center justify-center p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
          onClick={handleSubmit}
        >
          등록하기
        </Button.Default>
      </div>
      <TitleForm title={title} onTitleChange={setTitle} />
      <CategorySelect category={category} onCategoryChange={setCategory} />
      <DescriptionForm description={description} onDescriptionChange={setDescription} />
      <PriceForm price={price} onPriceChange={setPrice} />
      <AddressForm address={address} onAddressChange={setAddress} />
      <ScheduleForm schedules={schedules} onSchedulesChange={setSchedules} />
      <ImageUploadForm
        bannerImage={bannerImage}
        onBannerImageChange={setBannerImage}
        subImages={subImages}
        onSubImagesChange={setSubImages}
      />
    </div>
  );
}

export default ActivityRegistration;
