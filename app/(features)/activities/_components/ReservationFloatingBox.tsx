/*
    예약용 플로팅 박스
*/
import Button from "@button/Button";
import React, { useEffect, useState } from "react";
import ParticipantCount from "./ParticipantCount";
import PriceInfo from "./PriceInfo";
import ScheduleSelector from "./ScheduleSelector";
import TotalPrice from "./TotalPrice";

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ReservationFloatingBoxProps {
  schedules: Schedule[];
  price: number;
}

const ReservationFloatingBox: React.FC<ReservationFloatingBoxProps> = ({ schedules, price }) => {
  const [participantCount, setParticipantCount] = useState<number>(1);
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [showScheduleSelector, setShowScheduleSelector] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  // const handleSubmit = async () => {
  //  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/activities/{activityId}/reservations`, {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //    body: JSON.stringify({ count: participantCount, schedule: selectedSchedule }),
  //  });

  //    if (response.ok) {
  //      alert("예약 성공! 😍");
  //    } else {
  //      alert("예약 실패! 😥");
  //    }
  //  };

  const toggleScheduleSelector = () => {
    setShowScheduleSelector(!showScheduleSelector);
  };

  return (
    <div className="relative h-auto w-full whitespace-nowrap rounded border border-solid border-primary-gray-400 px-6 py-4 shadow-lg">
      {showScheduleSelector && isMobile ? (
        // 모바일에서만 전체화면 모달
        <div className="fixed inset-0 z-50 flex flex-col whitespace-nowrap bg-white px-6 py-10">
          <div className="flex items-center justify-between border-primary-gray-400 p-4 md:border-b md:border-solid xl:border-b xl:border-solid">
            <h3 className="text-xl-bold text-primary-black-100">날짜</h3>
            <button onClick={toggleScheduleSelector} className="text-black">
              X
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-auto p-4">
            <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
            <ParticipantCount count={participantCount} setCount={setParticipantCount} />
          </div>
          <div className="border-primary-gray-400 p-4 md:border-t md:border-solid xl:border-t xl:border-solid">
            <Button.Default type="nomadBlack" className="h-14 w-full p-2 text-center" onClick={toggleScheduleSelector}>
              확인
            </Button.Default>
          </div>
        </div>
      ) : (
        <>
          {showScheduleSelector && (
            // 날짜 선택하기 Modal (Tablet, PC)
            <div className="absolute left-[-190px] top-0 z-50 flex h-full w-[480px] items-center justify-center whitespace-nowrap">
              <div className="relative rounded-lg bg-white p-4 shadow-lg md:w-[400px] xl:w-[600px]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl-bold text-primary-black-100">날짜</h3>
                  <button onClick={toggleScheduleSelector} className="text-black">
                    X
                  </button>
                </div>
                <div className="text-center">
                  <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
                </div>
                <Button.Default onClick={toggleScheduleSelector} className="mt-4 w-full border-0 bg-primary-gray-100">
                  확인
                </Button.Default>
              </div>
            </div>
          )}
          {/* 가격 (모바일에서는 일정 선택 전에만 보이게) */}
          {isMobile && !selectedSchedule && <PriceInfo price={price} />}
          {!isMobile && <PriceInfo price={price} />}
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          {/* 날짜 */}
          <h3 className="hidden pb-3 text-xl-bold text-primary-black-100 md:block xl:block">날짜</h3>
          <div className="block md:hidden">
            <Button.Default onClick={toggleScheduleSelector} className="border-0 font-bold underline">
              {selectedSchedule ? "다시 선택하기" : "날짜 선택하기"}
            </Button.Default>
          </div>
          <div className="hidden md:block xl:hidden">
            <Button.Default onClick={toggleScheduleSelector} className="border-0 font-bold underline">
              {selectedSchedule ? "다시 선택하기" : "날짜 선택하기"}
            </Button.Default>
          </div>
          <div className="hidden xl:block">
            <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
          </div>
          {selectedSchedule && isMobile && (
            <div className="text-lg-semibold text-primary-black-100">
              <p>
                ₩ {formatPrice(price * participantCount)} / 총 {participantCount}인
              </p>
              <p>{selectedSchedule}</p>
            </div>
          )}
          {selectedSchedule && !isMobile && (
            <div className="my-4">
              <div className="text-lg text-primary-black-100">
                <p>{selectedSchedule}</p>
              </div>
            </div>
          )}
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          {/* 총 인원 */}
          <div className="hidden md:block xl:block">
            <ParticipantCount count={participantCount} setCount={setParticipantCount} />
          </div>
          <div className={`pt-4 ${isMobile ? "fixed bottom-4 right-4" : ""}`}>
            {/* TODO: API 연결하며 onClick={handleSubmit} Button에 추가 */}
            <Button.Submit className={`h-14 ${isMobile ? "w-[106px]" : "w-auto"}`}>예약하기</Button.Submit>
          </div>
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          {/* 총 가격 */}
          <div className="hidden md:block xl:block">
            <TotalPrice price={price} count={participantCount} />
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationFloatingBox;
