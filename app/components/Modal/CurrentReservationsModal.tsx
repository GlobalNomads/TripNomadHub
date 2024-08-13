/*
    CurrentReservationsModal(예약 정보 모달): 해당 날짜의 예약 신청 내역을 확인하고 승인/거절할 수 있는 모달창
*/

"use client";

import { FC } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

interface CurrentReservationsModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CurrentReservationsModal: FC<CurrentReservationsModal> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} className="md:h-[750px] md:w-[480px]">
      <ModalHeader title={<div className="text-2xl-bold text-primary-black-200">예약 정보</div>} onClose={onClose} />
      <ModalBody>
        <div className="flex-start flex w-full flex-col">
          <div>신청|승인|거절</div>
          <div>
            <h3>예약 날짜</h3>
            <span>2023년 2월 10일</span>
            <span>13:00~15:00</span>
          </div>
          <h3> 예약내역</h3>
        </div>
      </ModalBody>
      <ModalFooter className="text-2xl-semibold text-primary-black-200">예약 현황</ModalFooter>
    </DefaultModal>
  );
};

export default CurrentReservationsModal;
