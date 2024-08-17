/*
    ReviewModal(후기작성 모달): 현재는 틀만 만들어뒀습니다! 실제 사용하려면 많이 수정해서 써야 합니다!
    bg-primary-green-100로 영역 표시만 해 뒀습니다.
    TODO: 마음껏 변경하셔도 됩니다...!
*/

"use client";

import RatingStar from "@/(features)/(user)/myreservations/_components/Modal/MakeStar";
import ReservationInfo from "@/(features)/(user)/myreservations/_components/Modal/ReservationInfo";
import postMyReservations, { ReservationInput } from "@/api/MyReservations/postMyReservations";
import { ReservationsList } from "@/types/myActivities.type";
import Button from "@button/Button";
import { FC, useEffect, useState } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: ReservationsList | null;
  onSuccess: () => void;
}

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, onClose, reservation, onSuccess = () => {} }) => {
  const [rating, setRaing] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setRaing(0);
      setContent("");
    }
  }, [isOpen, reservation]);

  const handleRatingChange = (newRating: number) => {
    setRaing(newRating);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  //작성하기 버튼 눌렀을 때
  const handleSubmit = async () => {
    if (reservation && rating > 0 && content.trim() !== "") {
      const reservationInput: ReservationInput = { rating, content };

      try {
        await postMyReservations(reservationInput, reservation.id);
        alert("후기를 저장했습니다");
        onSuccess();
        onClose();
      } catch (error) {
        console.error(error);
        alert("Error: 후기 저장을 실패했습니다");
      }
    } else {
      alert("별점과 후기 모두 입력해주세요");
    }
  };
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      className="h-full max-h-[100vh] w-full overflow-y-auto md:h-[750px] md:w-[480px] md:rounded-3xl"
    >
      <div className="md:mb-[41px]">
        <ModalHeader title={<div className="text-2xl-bold">후기 작성</div>} onClose={onClose} />
      </div>
      <ModalBody>
        <div className="flex flex-grow flex-col items-center">
          <div className="md:mb-[24px]">
            <ReservationInfo reservation={reservation} />
          </div>
          <RatingStar onRatingChange={handleRatingChange} currentRating={rating} />
          <textarea
            value={content}
            onChange={handleContentChange}
            className="h-[346px] w-full border border-primary-gray-700 px-4 py-2 md:mb-[24px] md:h-[240px] md:w-[432px]"
            placeholder="후기를 작성해주세요"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button.Default type="nomadBlack" onClick={handleSubmit} className="h-[54px] w-full p-[7px] md:h-[56px]">
          작성하기
        </Button.Default>
      </ModalFooter>
    </DefaultModal>
  );
};

export default ReviewModal;
