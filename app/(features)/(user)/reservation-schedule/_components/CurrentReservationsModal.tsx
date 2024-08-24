/*
 * CurrentReservationsModal(예약 정보 모달): 해당 날짜의 예약 신청 내역을 확인하고 승인/거절할 수 있는 모달창
 * Reservation Tabs: 신청, 승인, 거절 선택 Tab
 * SelectBoxReservationsList: 예약날짜에 해당하는 체험 시간(에 해당하는 scheduleId) 선택하는 select box 컴포넌트
 * Reservation List: select box에서 전달된 scheduleId에 해당하는 예약 내역을 불러오는 컴포넌트
 * TODO: 최적화를 위한 refactoring은 모달 컴포넌트 연결 후 진행하겠습니다! 😎
 */

"use client";

import getMyActivitiesIdRes from "@/api/MyActivities/getMyActivitiesIdRes";
import { Count, MyActivitiesResData, MyActivitiesSchData } from "@/types/myActivities.type";
import Modal from "@modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import ReservationList from "./ReservationList";
import ReservationTabs from "./ReservationTabs";
import SelectBoxReservationsList from "./SelectBoxReservationsList";

interface CurrentReservationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  activityId: number;
  scheduleData: MyActivitiesSchData[];
}

interface ReservationList {
  stats: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  scheduleId: number;
}

// 들어온 날짜 형태 변환
const formatDateString = (dateString: string) => {
  const [year, month, day] = dateString.split("-");

  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
};

const CurrentReservationsModal: FC<CurrentReservationsModalProps> = ({
  isOpen,
  onClose,
  date,
  activityId,
  scheduleData,
}) => {
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "declined">("pending");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(scheduleData[0].scheduleId);
  const [selectedScheduleCount, setSelectedScheduleCount] = useState<Count>(scheduleData[0].count);
  const [filteredReservations, setFilteredReservations] = useState<MyActivitiesResData | undefined>();

  const { data: reservationData } = useQuery<MyActivitiesResData>({
    queryKey: ["getMyActivitiesIdRes", selectedScheduleId, activeTab],
    queryFn: () => getMyActivitiesIdRes(activityId, { scheduleId: selectedScheduleId, status: activeTab }),
    staleTime: 60000,
    retry: 2,
    enabled: isOpen,
  });

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
          <ReservationTabs activeTab={activeTab} setActiveTab={setActiveTab} scheduleData={selectedScheduleCount} />
          <hr className="mb-6 border-t border-primary-gray-300" />
          <div className="mb-6 flex flex-col">
            <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 날짜</h3>
            <span className="mb-4 text-xl-regular">{formatDateString(date)}</span>
            <SelectBoxReservationsList
              schedules={scheduleData}
              onSelectChange={setSelectedScheduleId}
              onCountChage={setSelectedScheduleCount}
            />
          </div>
          <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 내역</h3>
          <ReservationList reservations={reservationData} />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between text-2xl-bold text-primary-black-200">
        <div>예약 현황</div>
        <div>{reservationData?.totalCount ?? 0}</div> {/* 활성 탭에 따라 예약 총 건수를 표시 */}
      </Modal.Footer>
    </Modal.Default>
  );
};

export default CurrentReservationsModal;
