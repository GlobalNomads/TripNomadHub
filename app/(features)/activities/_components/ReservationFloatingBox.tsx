/*
    예약용 플로팅 박스
*/
import Button from "@button/Button";
import React, { useState } from "react";
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

  const handleSubmit = async () => {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: participantCount, schedule: selectedSchedule }),
    });

    if (response.ok) {
      alert("Successfully submitted!");
    } else {
      alert("Submission failed.");
    }
  };

  const toggleScheduleSelector = () => {
    setShowScheduleSelector(!showScheduleSelector);
  };

  return (
    <div className="relative h-auto w-full rounded border border-solid border-primary-gray-400 px-6 py-4 shadow-lg">
      {showScheduleSelector ? (
        <div className="flex flex-col">
          <div className="text-right">
            <button onClick={toggleScheduleSelector} className="text-black">
              X
            </button>
          </div>
          <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
          <Button.Default onClick={toggleScheduleSelector} className="mt-4">
            확인
          </Button.Default>
        </div>
      ) : (
        <>
          <PriceInfo price={price} />

          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          <h3 className="text-xl-bold text-primary-black-100">날짜</h3>
          <div className="block md:hidden">
            <Button.Default onClick={toggleScheduleSelector} className="border-0">
              {selectedSchedule ? "날짜 다시 선택하기" : "날짜 선택하기"}
            </Button.Default>
          </div>
          <div className="hidden md:block xl:hidden">
            <Button.Default onClick={toggleScheduleSelector} className="border-0">
              {selectedSchedule ? "날짜 다시 선택하기" : "날짜 선택하기"}
            </Button.Default>
          </div>
          <div className="hidden xl:block">
            <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
          </div>
          <div className="my-4">
            {selectedSchedule ? (
              <div className="text-lg text-primary-black-100 xl:hidden">
                <p>{selectedSchedule}</p>
              </div>
            ) : (
              <div className="text-lg text-primary-black-100">
                <p>날짜를 선택하세요</p>
              </div>
            )}
          </div>
          <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
          <ParticipantCount count={participantCount} setCount={setParticipantCount} />
          <div className="pt-4">
            <Button.Submit onClick={handleSubmit} className="">
              예약하기
            </Button.Submit>
          </div>
          <hr className="xl.block my-4 hidden border-t border-primary-black-100 opacity-25 md:block" />
          <TotalPrice price={price} count={participantCount} />
        </>
      )}
    </div>
  );
};

export default ReservationFloatingBox;
