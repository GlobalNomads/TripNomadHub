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

  return (
    <div className="h-auto w-[384px] whitespace-nowrap rounded border border-solid border-primary-gray-400 px-6 py-4 shadow-lg md:w-[251]">
      <PriceInfo price={price} />
      <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
      <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
      <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
      <ParticipantCount count={participantCount} setCount={setParticipantCount} />
      <div className="pt-4">
        <Button.Submit onClick={handleSubmit} className="">
          예약하기
        </Button.Submit>
      </div>
      <hr className="my-4 hidden border-t border-primary-black-100 opacity-25 md:block xl:block" />
      <TotalPrice price={price} count={participantCount} />
    </div>
  );
};

export default ReservationFloatingBox;
