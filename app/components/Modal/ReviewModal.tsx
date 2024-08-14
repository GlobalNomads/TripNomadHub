"use client";

import RatingStar from "@/(features)/(user)/myreservations/_components/Modal/MakeStar";
import ReservationInfo from "@/(features)/(user)/myreservations/_components/Modal/ReservationInfo";
import postMyReservations, { ReservationInput } from "@/api/MyReservations/postMyReservations";
import { ReservationsList } from "@/types/myReservations.type";
import Button from "@button/Button";
import { FC, useEffect, useState } from "react";
import DefaultModal, { ModalFunctionProps } from "./DefaultModal";

interface ReviewModalProps extends ModalFunctionProps {
  onSubmit: () => void;
  reservation: ReservationsList | null;
  onSuccess: () => void;
}

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, onClose, reservation, onSuccess = () => {} }) => {
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  // Reset states whenever reservation changes or modal is opened
  useEffect(() => {
    if (isOpen) {
      setRating(0);
      setContent("");
    }
  }, [isOpen, reservation]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = async () => {
    if (reservation && rating > 0 && content.trim() !== "") {
      const reservationInput: ReservationInput = { rating, content };

      try {
        await postMyReservations(reservationInput, reservation.id);

        alert("후기를 저장했습니다");
        onSuccess();
      } catch (error) {
        console.error(error);
        alert("후기 저장에 실패했습니다.");
      }
    } else {
      alert("별점과 후기 모두 입력해주세요.");
    }
  };

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      borderRadius="rounded-none md:rounded-3xl xl:rounded-3xl"
      title={<div className="text-2xl-bold">후기 작성</div>}
      footer={
        <div className="mt-6 flex w-full justify-center">
          <Button.Default type="nomadBlack" onClick={handleSubmit} className="h-[54px] w-full p-[7px] md:h-[56px]">
            작성하기
          </Button.Default>
        </div>
      }
      width="w-full md:w-[480px]"
      height="h-full md:h-[750px]"
    >
      <div className="flex flex-grow flex-col items-center overflow-y-auto p-4">
        <div>
          <ReservationInfo reservation={reservation} />
        </div>
        <RatingStar onRatingChange={handleRatingChange} currentRating={rating} />
        <textarea
          value={content}
          onChange={handleContentChange}
          className="h-[346px] w-full border border-primary-gray-700 px-4 py-2 md:h-60"
          placeholder="후기를 작성해주세요"
        />
      </div>
    </DefaultModal>
  );
};

export default ReviewModal;
