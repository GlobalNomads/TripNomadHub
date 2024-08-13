/*
    CurrentReservationsModal(예약 정보 모달): 해당 날짜의 예약 신청 내역을 확인하고 승인/거절할 수 있는 모달창
*/
"use client";

import Button from "@button/Button";
import Dropdown, { DropdownItem, DropdownTrigger } from "@dropdown/DropDown";
import ic_down from "@icon/ic_arrow_down.svg";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

// 예약 내역 타입 정의
interface Reservation {
  id: number;
  nickname: string;
  headCount: number;
  status: "pending" | "confirmed" | "declined";
}

// 모달 컴포넌트 타입 정의
interface CurrentReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 모달 컴포넌트 구현
const CurrentReservationsModal: FC<CurrentReservationsModalProps> = ({ isOpen, onClose }) => {
  // Mock Data를 컴포넌트 내부에 정의
  const scheduleData = {
    startTime: "2024-08-14T13:00:00.000Z",
    endTime: "2024-08-14T15:00:00.000Z",
    count: {
      declined: 2,
      confirmed: 5,
      pending: 3,
    },
  };

  const reservationData = {
    pending: [
      {
        id: 101,
        nickname: "John Doe",
        headCount: 3,
        status: "pending" as const,
      },
    ],
    confirmed: [
      {
        id: 102,
        nickname: "Jane Smith",
        headCount: 5,
        status: "confirmed" as const,
      },
    ],
    declined: [
      {
        id: 103,
        nickname: "Alice Johnson",
        headCount: 2,
        status: "declined" as const,
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "declined">("pending");

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
        <div className="flex w-full flex-col">
          {/* 탭 선택 */}
          <div className="mb-2 flex space-x-4 text-xl-regular">
            <div
              className={`cursor-pointer ${activeTab === "pending" ? "text-primary-green-500" : "text-primary-black-200"}`}
              onClick={() => setActiveTab("pending")}
            >
              신청 {scheduleData.count.pending}
            </div>
            <div
              className={`cursor-pointer ${activeTab === "confirmed" ? "text-primary-green-500" : "text-primary-black-200"}`}
              onClick={() => setActiveTab("confirmed")}
            >
              승인 {scheduleData.count.confirmed}
            </div>
            <div
              className={`cursor-pointer ${activeTab === "declined" ? "text-primary-red-500" : "text-primary-black-200"}`}
              onClick={() => setActiveTab("declined")}
            >
              거절 {scheduleData.count.declined}
            </div>
          </div>

          <hr className="mb-10 border-t border-primary-gray-300" />

          {/* 예약 날짜 및 시간 선택 */}
          <div className="mb-6 flex flex-col">
            <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 날짜</h3>
            <span className="mb-4 text-xl-regular">2024년 8월 14일</span>
            <DropDownReservationsList />
          </div>

          {/* 선택된 탭에 따라 예약 내역 표시 */}
          <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 내역</h3>
          {reservationData[activeTab].map(reservation => (
            <ReservationListCard
              key={reservation.id}
              status={reservation.status}
              nickname={reservation.nickname}
              headCount={reservation.headCount}
            />
          ))}
        </div>
      </ModalBody>
      <ModalFooter className="flex justify-between text-2xl-bold text-primary-black-200">
        <h2>예약 현황</h2>
        <div>{reservationData[activeTab].length}</div>
      </ModalFooter>
    </DefaultModal>
  );
};

// 예약 카드 컴포넌트
interface ReservationListCardProps {
  status: "pending" | "confirmed" | "declined";
  nickname: string;
  headCount: number;
}

const ReservationListCard: FC<ReservationListCardProps> = ({ status, nickname, headCount }) => {
  return (
    <div className="space-y-2 rounded-lg border border-solid border-primary-gray-300 p-4">
      <div className="space-x-3 text-[16px]">
        <span className="font-bold text-primary-gray-700">닉네임</span>
        <span className="font-semibold text-primary-black-200">{nickname}</span>
      </div>
      <div className="space-x-3 text-[16px]">
        <span className="font-bold text-primary-gray-700">인원</span>
        <span className="font-semibold text-primary-black-200">{headCount}명</span>
      </div>

      {status === "pending" ? (
        <div className="flex justify-end space-x-2">
          <Button type="nomadBlack" className="h-[38px] w-[82px]">
            승인하기
          </Button>
          <Button type="white" className="h-[38px] w-[82px]">
            거절하기
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            className={`rounded-3xl px-[15px] py-[10px] text-lg-bold ${
              status === "confirmed"
                ? "bg-primary-orange-100 text-primary-orange-200"
                : "bg-primary-red-100 text-primary-red-200"
            }`}
          >
            {status === "confirmed" ? "예약 승인됨" : "예약 거절됨"}
          </button>
        </div>
      )}
    </div>
  );
};

// 드롭다운 컴포넌트
const DropDownReservationsList: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<string | number>("auto");

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth);
    }
  }, [isOpen]);

  const handleClick = () => {
    console.log("시간대 선택됨");
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <DropdownTrigger onClick={() => setIsOpen(!isOpen)} className="w-full">
          <div className="flex h-[56px] items-center rounded border border-solid border-primary-gray-700 p-1">
            <div className="w-full pl-4 text-left">시간 선택</div>
            <div className="p-3">
              <Image src={ic_down} width={24} height={24} alt="체험 시간 선택" />
            </div>
          </div>
        </DropdownTrigger>
      }
    >
      <DropdownItem
        onClick={handleClick}
        className="flex-start flex h-[56px] rounded border border-solid border-primary-gray-200 py-4 pl-4"
      >
        13:00~15:00
      </DropdownItem>
      <DropdownItem
        onClick={handleClick}
        className="flex-start flex h-[56px] rounded border border-solid border-primary-gray-200 py-4 pl-4"
      >
        15:00~17:00
      </DropdownItem>
    </Dropdown>
  );
};

export default CurrentReservationsModal;
