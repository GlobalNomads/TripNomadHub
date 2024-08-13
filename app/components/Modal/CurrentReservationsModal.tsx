/*
    CurrentReservationsModal(예약 정보 모달): 해당 날짜의 예약 신청 내역을 확인하고 승인/거절할 수 있는 모달창
*/

"use client";

import Button from "@button/Button";
import Dropdown, { DropdownItem, DropdownTrigger } from "@dropdown/DropDown";
import ic_down from "@icon/ic_arrow_down.svg";
import Image from "next/image";
import { FC, useState } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

interface CurrentReservationsModal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const CurrentReservationsModal: FC<CurrentReservationsModal> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} className="md:h-[750px] md:w-[480px]">
      <ModalHeader
        title={
          <div className="mb-4 text-2xl-bold text-primary-black-200">
            <h2 className="h-10 py-3">예약 정보</h2>
          </div>
        }
        onClose={onClose}
      />
      <ModalBody>
        <div className="flex-start mb-10 flex w-full flex-col">
          <div className="mb-2 flex space-x-2 text-xl-regular">
            <div>신청 0</div>
            <div>승인 1</div>
            <div>거절 1</div>
          </div>
          <hr className="mb-10 border-t border-primary-gray-300" />
          <div className="mb-6 flex flex-col">
            <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 날짜</h3>
            <span className="mb-1 text-xl-regular">2023년 2월 10일</span>
            <DropDownReservationsList />
          </div>
          <h3 className="mb-4 text-xl-bold text-primary-black-200">예약내역</h3>
          <ReservationListCard />
        </div>
      </ModalBody>
      <ModalFooter className="flex justify-between text-2xl-bold text-primary-black-200">
        <h2>예약 현황</h2>
        <div>5</div>
      </ModalFooter>
    </DefaultModal>
  );
};

export const ReservationListCard: FC = () => {
  return (
    <div className="space-y-2 rounded-lg border border-solid border-primary-gray-300 p-4">
      <div className="space-x-3 text-[16px]">
        <span className="font-bold text-primary-gray-700">닉네임</span>
        <span className="font-semibold text-primary-black-200">정만철</span>
      </div>
      <div className="space-x-3 text-[16px]">
        <span className="font-bold text-primary-gray-700">인원</span>
        <span className="font-semibold text-primary-black-200">12명</span>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="nomadBlack" className="h-[38px] w-[82px]">
          승인하기
        </Button>
        <Button type="white" className="h-[38px] w-[82px]">
          거절하기
        </Button>
      </div>
      <div className="flex justify-end space-x-2">
        <button className="rounded-3xl bg-primary-orange-100 px-[15px] py-[10px] text-lg-bold text-primary-orange-200">
          예약 승인
        </button>
        <button className="rounded-3xl bg-primary-red-100 px-[15px] py-[10px] text-lg-bold text-primary-red-200">
          예약 거절
        </button>
      </div>
    </div>
  );
};

export const DropDownReservationsList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log("Edit action triggered");
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <DropdownTrigger className="w-full" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex h-[56px] items-center rounded border border-solid border-primary-gray-700 p-1">
            <div className="w-full pl-4 text-left">시간 선택</div>
            <div className="p-3">
              <Image src={ic_down} width={24} height={24} alt="체험 시간 선택" />
            </div>
          </div>
        </DropdownTrigger>
      }
    >
      <DropdownItem onClick={handleClick} className="h-[56px]">
        13:00~15:00
      </DropdownItem>
      <DropdownItem onClick={handleClick} className="h-[56px]">
        15:00~17:00
      </DropdownItem>
    </Dropdown>
  );
};

export default CurrentReservationsModal;
