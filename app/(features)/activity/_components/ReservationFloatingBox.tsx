/*
    예약용 플로팅 박스
*/
"use client";

import postActivitiesIdRez from "@/api/Activities/postActivitiesIdRez";
import useWindowSize from "@/hooks/useWindowSize"; // 화면 사이즈 변경시 컴포넌트 내 요소 사이즈 조정 커스텀 훅
import { ReservationFloatingBoxProps, ReservationRequest } from "@/types/activities.type";
import Button from "@button/Button";
import Modal from "@modal/Modal";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import ParticipantCount from "./ParticipantCount";
import PriceInfo from "./PriceInfo";
import ScheduleSelector from "./ScheduleSelector";
import TotalPrice from "./TotalPrice";

const ReservationFloatingBox: React.FC<ReservationFloatingBoxProps> = ({ activityId, schedules, price }) => {
  const [participantCount, setParticipantCount] = useState<number>(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const selectedSchedule = schedules.find(schedule => schedule.id === selectedScheduleId);
  const [showScheduleSelector, setShowScheduleSelector] = useState<boolean>(false);

  const windowSize = useWindowSize(); // 커스텀 훅 사용
  const isMobile = windowSize < 768; // 모바일인지 판단하는 조건

  //모달 상태 관리
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => () => {});

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const handleParticipantCountChange = (newCount: number) => {
    if (!selectedScheduleId) {
      openConfirmModal("체험 일정을 먼저 선택해주세요.", () => {});
      return;
    }
    setParticipantCount(newCount);
  };

  const reservationMutation = useMutation({
    mutationFn: (newReservation: ReservationRequest) => postActivitiesIdRez(activityId, newReservation),
    onSuccess: () => {
      openConfirmModal("예약 성공! 😍", () => {
        setConfirmModalOpen(false);
      });
    },
    onError: (err: Error) => {
      openConfirmModal(`예약 실패! 😥: ${err.message}`, () => {
        setConfirmModalOpen(false);
      });
    },
  });

  const handleReservation = () => {
    const scheduleId = Number(selectedScheduleId);
    if (isNaN(scheduleId)) {
      openConfirmModal("선택된 스케줄 ID가 유효하지 않습니다.", () => {});
      return;
    }
    if (!scheduleId || participantCount < 1) {
      openConfirmModal("모든 정보를 올바르게 입력해주세요.", () => {});
      return;
    }
    const reservationData = {
      activityId: activityId,
      scheduleId: scheduleId, //Number(selectedScheduleId),
      headCount: participantCount,
    };
    console.log("Reservation data being sent:", reservationData);

    reservationMutation.mutate(reservationData);
  };

  //모달 열기 함수
  const openConfirmModal = (message: string, onConfirm: () => void) => {
    setConfirmModalMessage(message);
    setOnConfirmAction(() => onConfirm);
    setConfirmModalOpen(true);
  };

  const toggleScheduleSelector = () => {
    setShowScheduleSelector(!showScheduleSelector);
  };

  return (
    <div className="relative h-auto w-full whitespace-nowrap border border-solid border-primary-gray-400 px-6 py-4 shadow-lg md:rounded-lg">
      {showScheduleSelector && isMobile ? (
        // 모바일에서만 전체화면 모달
        <div className="fixed inset-0 z-50 flex flex-col whitespace-nowrap bg-white px-6 py-10 pt-20">
          <div className="flex items-center justify-between border-primary-gray-400 p-4 md:border-b md:border-solid">
            <h3 className="text-xl-bold text-primary-black-100">날짜</h3>
            <button onClick={toggleScheduleSelector} className="text-black">
              X
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-auto p-4">
            <ScheduleSelector schedules={schedules} setSelectedScheduleId={setSelectedScheduleId} />
            <ParticipantCount count={participantCount} setCount={setParticipantCount} />
          </div>
          <div className="border-primary-gray-400 p-4 md:border-t md:border-solid">
            <Button.Default type="nomadBlack" className="h-14 w-full p-2 text-center" onClick={toggleScheduleSelector}>
              확인
            </Button.Default>
          </div>
        </div>
      ) : (
        <>
          {showScheduleSelector && (
            // 날짜 선택하기 Modal (Tablet)
            <div className="absolute left-[-180px] top-0 z-50 flex h-full w-[480px] items-center justify-center whitespace-nowrap">
              <div className="relative rounded-lg bg-white p-4 shadow-lg md:w-[400px] xl:w-[600px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl-bold text-primary-black-100">날짜</h3>
                  <button onClick={toggleScheduleSelector} className="text-black">
                    X
                  </button>
                </div>
                <div className="text-center">
                  <ScheduleSelector schedules={schedules} setSelectedScheduleId={setSelectedScheduleId} />
                </div>
                <Button.Default onClick={toggleScheduleSelector} className="mt-4 w-full border-0 bg-primary-gray-100">
                  확인
                </Button.Default>
              </div>
            </div>
          )}
          {/* 가격 (모바일에서는 일정 선택 전에만 보이게) */}
          {isMobile && !selectedScheduleId && <PriceInfo price={price} />}
          {!isMobile && <PriceInfo price={price} />}
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          {/* 날짜 */}
          <h3 className="hidden pb-3 text-xl-bold text-primary-black-100 md:block xl:block">날짜</h3>
          <div className="block md:hidden">
            <Button.Default onClick={toggleScheduleSelector} className="border-0 font-bold underline">
              {selectedScheduleId ? "다시 선택하기" : "날짜 선택하기"}
            </Button.Default>
          </div>
          <div className="hidden md:block xl:hidden">
            <Button.Default onClick={toggleScheduleSelector} className="border-0 font-bold underline">
              {selectedScheduleId ? "다시 선택하기" : "날짜 선택하기"}
            </Button.Default>
          </div>
          {/*날짜 선택하기(PC)*/}
          <div className="hidden xl:block">
            <ScheduleSelector schedules={schedules} setSelectedScheduleId={setSelectedScheduleId} />
          </div>
          {/*스케줄 선택후 보여지는 총 금액(Mobile)*/}
          {selectedSchedule && isMobile && (
            <div className="text-lg-semibold text-primary-black-100">
              <p>
                ₩ {formatPrice(price * participantCount)} / 총 {participantCount}인
              </p>
              <p>{`${selectedSchedule.date} ${selectedSchedule.startTime}~${selectedSchedule.endTime}`}</p>
            </div>
          )}
          {/*선택한 일정 (Tablet, PC)*/}
          {selectedSchedule && !isMobile && (
            <div className="my-4">
              <div className="text-lg text-primary-black-100">
                <p>{`${selectedSchedule.date} ${selectedSchedule.startTime}~${selectedSchedule.endTime}`}</p>
              </div>
            </div>
          )}
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          {/* 총 인원 조정 컴포넌트 */}
          <div className="hidden md:block xl:block">
            <ParticipantCount count={participantCount} setCount={handleParticipantCountChange} />
          </div>
          <div className={`pt-4 ${isMobile ? "fixed bottom-4 right-4" : ""}`}>
            <Button.Submit
              onClick={handleReservation}
              className={`h-14 ${isMobile ? "w-[106px]" : "w-auto"}`}
              disabled={!selectedScheduleId}
            >
              예약하기
            </Button.Submit>
          </div>
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          {/* 총 가격 */}
          <div className="hidden md:block xl:block">
            <TotalPrice price={price} count={participantCount} />
          </div>
        </>
      )}
      {/* ConfirmModal 렌더링 */}
      <Modal.Confirm
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          onConfirmAction();
          setConfirmModalOpen(false);
        }}
        message={confirmModalMessage}
      />
    </div>
  );
};

export default ReservationFloatingBox;
