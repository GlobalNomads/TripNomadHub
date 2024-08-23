"use client";

import patchMyActivitiesId, { MyActivitiesInput } from "@/api/MyActivities/patchMyActivitiesId";
import useMultipleFiles from "@/hooks/useMultipleFiles";
import useSingleFiles from "@/hooks/useSingleFiles";
import { ActivitiesIdData } from "@/types/activities.type";
import { useImageUpload } from "@api/Activities/postActivitiesImg";
import Button from "@button/Button";
import Modal from "@modal/Modal";
import { useEffect, useMemo, useState } from "react";
import AddressForm from "../../../_components/AddressForm";
import CategorySelect from "../../../_components/CategorySelect";
import DescriptionForm from "../../../_components/DescriptionForm";
import PriceForm from "../../../_components/PriceForm";
import TitleForm from "../../../_components/TitleForm";
import ImageUploadForm from "./ImageUploadForm";
import ScheduleForm from "./ScheduleForm";

// Props 타입 정의
interface EditFormProps {
  activityData: ActivitiesIdData;
  activityId: number;
}

const EditForm: React.FC<EditFormProps> = ({ activityData, activityId }) => {
  const images = useMemo(() => activityData?.subImages?.map(image => image.imageUrl) ?? [], [activityData.subImages]);
  const convertedSettingImages = useMultipleFiles(images);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  //저장용과 삭제용 구분
  const [addSchedules, setAddSchedules] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [deleteSchedules, setDeleteSchedules] = useState<{ date: string; startTime: string; endTime: string }[]>([]);
  const [addSubImages, setAddSubImages] = useState<File[]>([]);
  const [deleteSubImages, setDeleteSubImages] = useState<string[]>([]);

  const [bannerImage, setBannerImage] = useState<File | null>(null);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const handleError = (error: Error) => {
    const errorMessage = error.message || "이미지 업로드에 실패했습니다😨";
    setModalMessage(`오류😨: ${errorMessage}`);
    setIsModalOpen(true);
  };

  // 이미지 업로드를 위한 Mutation 훅 사용
  const { mutateAsync, status } = useImageUpload(handleError);

  const isLoading = status === "pending";
  const bannerImageUrl = useSingleFiles(activityData?.bannerImageUrl);

  const handleSubmit = async () => {
    try {
      let bannerImageUrl = "";
      let subImageUrlsToAdd: string[] = [];
      const subImageIdsToRemove = deleteSubImages;
      const schedulesToAdd = addSchedules;
      const scheduleIdsToRemove = deleteSchedules;

      // 배너 이미지 업로드
      if (bannerImage) {
        const uploadedBannerImage = await mutateAsync(bannerImage);
        bannerImageUrl = uploadedBannerImage.activityImageUrl;
      }

      // 서브 이미지 업로드
      if (addSubImages.length > 0) {
        subImageUrlsToAdd = await Promise.all(
          addSubImages.map(async image => {
            const uploadedImage = await mutateAsync(image);
            return uploadedImage.activityImageUrl; // 이미지 URL만 반환
          }),
        );
      }

      // 최종 데이터 수집
      const formData: MyActivitiesInput = {
        title,
        category,
        description,
        address,
        price,
        bannerImageUrl,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      // API 요청 실행
      const response = await patchMyActivitiesId(formData, activityId);
      setModalMessage("수정이 성공적으로 완료되었습니다!");
      setIsModalOpen(true);
    } catch (error: any) {
      // 오류 메시지 추출 (필요시 error.message로 사용)
      const errorMessage =
        error.response?.data?.message || error.message || "수정에 실패하였습니다. 다시 시도해주세요.";
      setModalMessage(`수정 실패😨: ${errorMessage}`);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (bannerImageUrl) {
      setBannerImage(bannerImageUrl);
    }
  }, [bannerImageUrl]);

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="font-pretendard text-[32px] font-bold leading-[42px]">내 체험 수정</h1>
        <Button.Default
          type="nomadBlack"
          className="flex h-[48px] w-[120px] items-center justify-center p-[8px] text-sm md:p-[12px] md:text-base lg:p-[16px] lg:text-lg"
          onClick={handleSubmit}
          disabled={isLoading} // 이미지 업로드 중에는 버튼 비활성화
        >
          수정하기
        </Button.Default>
      </div>
      <TitleForm title={activityData?.title} onTitleChange={setTitle} />
      <CategorySelect category={activityData?.category || ""} onCategoryChange={setCategory} />
      <DescriptionForm description={activityData?.description || ""} onDescriptionChange={setDescription} />
      <PriceForm price={activityData?.price || 0} onPriceChange={setPrice} />
      <AddressForm address={activityData?.address || ""} onAddressChange={setAddress} />
      <ScheduleForm
        schedules={addSchedules}
        settingSchedules={activityData?.schedules || []}
        onAddSchedulesChange={setAddSchedules}
        onDeleteSchedulesChange={setDeleteSchedules}
      />
      <ImageUploadForm
        bannerImage={bannerImage}
        onBannerImageChange={setBannerImage}
        settingImages={convertedSettingImages}
        subImages={addSubImages}
        onAddSubImagesChange={setAddSubImages}
        onDeleteSubImagesChange={setDeleteSubImages}
      />
      <Modal.Confirm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleCloseModal}
        message={modalMessage}
      />
    </>
  );
};

export default EditForm;
