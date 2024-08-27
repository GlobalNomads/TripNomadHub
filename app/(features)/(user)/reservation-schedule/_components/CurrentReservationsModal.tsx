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
  onUpdate: () => void;
}

interface ReservationList {
  stats: "pending" | "confirmed" | "declined" | "canceled" | "completed";
  scheduleId: number;
}

const CurrentReservationsModal: FC<CurrentReservationsModalProps> = ({
  isOpen,
  onClose,
  date,
  activityId,
  scheduleData,
  onUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "declined">("pending");
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(scheduleData[0].scheduleId);
  const [selectedScheduleCount, setSelectedScheduleCount] = useState<Count>(scheduleData[0].count);

  const { data: reservationData, refetch } = useQuery<MyActivitiesResData>({
    queryKey: ["getMyActivitiesIdRes", selectedScheduleId, activeTab],
    queryFn: () => getMyActivitiesIdRes(activityId, { scheduleId: selectedScheduleId, status: activeTab }),
    staleTime: 0,
    retry: 2,
    enabled: isOpen,
  });

  return (
    <Modal.Default
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto border border-solid border-primary-gray-300 md:h-[700px] md:w-[480px] md:rounded-3xl"
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
            <span className="mb-4 text-xl-regular">{date}</span>
            <SelectBoxReservationsList
              schedules={scheduleData}
              onSelectChange={setSelectedScheduleId}
              onCountChage={setSelectedScheduleCount}
            />
          </div>
          <h3 className="mb-4 text-xl-bold text-primary-black-200">예약 내역</h3>
          {reservationData ? (
            <ReservationList
              reservationData={reservationData}
              activityId={activityId}
              refetch={refetch}
              onUpdate={onUpdate}
            />
          ) : (
            <p>예약 데이터를 로딩 중입니다...</p>
          )}
        </div>
      </Modal.Body>
    </Modal.Default>
  );
};

export default CurrentReservationsModal;
