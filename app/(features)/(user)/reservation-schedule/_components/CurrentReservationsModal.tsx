/*
 * CurrentReservationsModal(예약 정보 모달): 해당 날짜의 예약 신청 내역을 확인하고 승인/거절할 수 있는 모달창
 * Reservation Tabs: 신청, 승인, 거절 선택 Tab
 * SelectBoxReservationsList: 예약날짜에 해당하는 체험 시간(에 해당하는 scheduleId) 선택하는 select box 컴포넌트
 * Reservation List: select box에서 전달된 scheduleId에 해당하는 예약 내역을 불러오는 컴포넌트
 * TODO: 최적화를 위한 refactoring은 모달 컴포넌트 연결 후 진행하겠습니다! 😎
 */

"use client";

import Modal from "@modal/Modal";
import { FC, useState } from "react";
import { reservationData, scheduleData } from "./MockData"; //TODO: API 연결 후 삭제
import ReservationList from "./ReservationList";
import ReservationTabs from "./ReservationTabs";
import SelectBoxReservationsList from "./SelectBoxReservationsList";

interface CurrentReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurrentReservationsModal: FC<CurrentReservationsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "declined">("pending");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(scheduleData[0].scheduleId);

  // 선택된 스케줄 ID에 따라 예약 데이터를 필터링합니다.
  const filteredReservations = reservationData[activeTab].filter(
    reservation => reservation.scheduleId === selectedScheduleId,
  );

  const transformedReservations = filteredReservations.map(item => ({
    ...item,
    status: item.status as "pending" | "confirmed" | "declined",
  }));

  return (
    <Modal.Default
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto border border-solid border-primary-gray-300 md:h-[750px] md:w-[480px] md:rounded-3xl"
      overlayBackground=""
    >
      <Modal.Header
        title={<div className="h-10 py-3 text-2xl-bold text-primary-black-200">예약 정보</div>}
        onClose={onClose}
      />
      <Modal.Body>
        <div className="flex w-full flex-col md:h-auto">
          <ReservationTabs activeTab={activeTab} setActiveTab={setActiveTab} scheduleData={scheduleData[0].count} />
          <hr className="mb-6 border-t border-primary-gray-300" />
          <div className="mb-6 flex flex-col">
            <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 날짜</h3>
            <span className="mb-4 text-xl-regular">2024년 8월 14일</span>{" "}
            {/* TODO: 2024년 8월 14일 -> calender에서 날짜 선택할 때 값 받아오도록 변경 */}
            <SelectBoxReservationsList schedules={scheduleData} onSelectChange={setSelectedScheduleId} />
          </div>
          <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 내역</h3>
          <ReservationList reservations={transformedReservations} />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between text-2xl-bold text-primary-black-200">
        <div>예약 현황</div>
        <div>{reservationData[activeTab].length}</div> {/* 활성 탭에 따라 예약 총 건수를 표시 */}
      </Modal.Footer>
    </Modal.Default>
  );
};

export default CurrentReservationsModal;
