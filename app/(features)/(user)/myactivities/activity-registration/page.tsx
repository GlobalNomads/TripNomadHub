/*
 * 체험 등록(activity-registration) 페이지
 */

"use client";

import { ActivityPostData } from "@/types/myActivities.type";
import postActivities from "@api/Activities/postActivities"; //체험 등록 api
import { useImageUpload } from "@api/Activities/postActivitiesImg"; //체험 이미지 등록
import Button from "@button/Button";
import Modal from "@modal/Modal";
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
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleError = (error: Error) => {
    const errorMessage = error.message || "이미지 업로드에 실패했습니다.";
    setModalMessage(`오류: ${errorMessage}`);
    setIsModalOpen(true);
  };

  // 이미지 업로드를 위한 Mutation 훅 사용
  const { mutateAsync, status } = useImageUpload(handleError);

  const isLoading = status === "pending";

  const handleSubmit = async () => {
    try {
      let bannerImageUrl = "";
      let subImageUrls: string[] = [];

      // 배너 이미지 업로드
      if (bannerImage) {
        const uploadedBannerImage = await mutateAsync(bannerImage);
        bannerImageUrl = uploadedBannerImage.activityImageUrl;
      }

      // 서브 이미지 업로드
      if (subImages.length > 0) {
        subImageUrls = await Promise.all(
          subImages.map(async image => {
            const uploadedImage = await mutateAsync(image);
            return uploadedImage.activityImageUrl; // 이미지 URL만 반환
          }),
        );
      }

      // 최종 데이터 수집
      const formData: ActivityPostData = {
        title,
        category,
        description,
        address,
        price,
        schedules,
        bannerImageUrl,
        subImageUrls,
      };

      // API 요청 실행
      const response = await postActivities(formData);
      setModalMessage("등록이 성공적으로 완료되었습니다!");
      setIsModalOpen(true);
    } catch (error: any) {
      // 오류 메시지 추출 (필요시 error.message로 사용)
      const errorMessage =
        error.response?.data?.message || error.message || "등록에 실패하였습니다. 다시 시도해주세요.";
      setModalMessage(`등록에 실패하였습니다. 오류: ${errorMessage}`);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="font-pretendard text-[32px] font-bold leading-[42px]">내 체험 등록</h1>
        <Button.Default
          type="nomadBlack"
          className="flex h-[48px] w-[120px] items-center justify-center p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
          onClick={handleSubmit}
          disabled={isLoading} // 이미지 업로드 중에는 버튼 비활성화
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
      <Modal.Confirm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        message={modalMessage}
      />
    </div>
  );
}

export default ActivityRegistration;
