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
import Modal from "@modal/Modal";
import { FC, ReactNode, useEffect, useState } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: ReservationsList | null;
  onSuccess: () => void;
  children?: ReactNode;
}

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, onClose, reservation, onSuccess = () => {} }) => {
  const [rating, setRaing] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

        setModalMessage("후기를 전달했습니다.");

        onSuccess();

        setConfirmModalOpen(true);
      } catch (error: any) {
        console.log(error);

        setModalMessage(error?.message || "오류가 발생했습니다. 다시 시도해주세요.");

        setConfirmModalOpen(true);
      }
    } else {
      setModalMessage("⛔별점과 후기 모두 입력해주세요");
      setConfirmModalOpen(true);
    }
  };
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      className="relative h-full w-full overflow-y-scroll md:h-[750px] md:max-h-[100vh] md:w-[480px] md:rounded-3xl xl:overflow-y-auto"
    >
      <div className="mb-[27px] md:mb-[37px]">
        <ModalHeader
          title={<div className="text-[28px] font-bold md:text-2xl-bold">후기 작성</div>}
          onClose={onClose}
        />
      </div>
      <ModalBody>
        <div className="flex flex-grow flex-col items-center">
          <div className="md:mb-[24px]">
            <ReservationInfo reservation={reservation} />
          </div>
          <RatingStar onRatingChange={handleRatingChange} currentRating={rating} />
          <div className="w-full">
            <textarea
              value={content}
              onChange={handleContentChange}
              className="h-[360px] w-full overflow-y-scroll border border-primary-gray-700 px-4 py-2 md:h-[240px]"
              placeholder="후기를 작성해주세요"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className="abolute bottom-[33px] w-full md:static">
        <Button.Default
          type="nomadBlack"
          onClick={handleSubmit}
          className="h-[54px] w-full p-[7px] md:static md:mb-auto md:h-[56px]"
        >
          작성하기
        </Button.Default>
      </ModalFooter>
      <Modal.Confirm
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          setConfirmModalOpen(false);
          onClose();
        }}
        message={modalMessage}
      />
    </DefaultModal>
  );
};

export default ReviewModal;
