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
    <div className="h-[746px] w-[384px] rounded border border-solid border-primary-gray-400 px-6 py-4 shadow-lg">
      <h2>예약용 플로팅 박스</h2>
      <PriceInfo price={price} />
      <ScheduleSelector schedules={schedules} setSelectedSchedule={setSelectedSchedule} />
      <ParticipantCount count={participantCount} setCount={setParticipantCount} />
      <TotalPrice price={price} count={participantCount} />
      <Button.Submit onClick={handleSubmit} className="">
        예약하기
      </Button.Submit>
    </div>
  );
};

export default ReservationFloatingBox;
