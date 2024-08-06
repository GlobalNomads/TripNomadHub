/*
    체험 예약 참여 인원 설정
*/

"use client";
import React from "react";

interface ParticipantCountProps {
  count: number;
  setCount: (count: number) => void;
}

const ParticipantCount: React.FC<ParticipantCountProps> = ({ count, setCount }) => {
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <div>
      <div>
        <h3 className="pb-2 text-xl-bold text-primary-black-100">참여 인원 수</h3>
      </div>
      <div className="flex h-10 w-28 items-center rounded-md border border-solid border-primary-gray-400 p-2">
        <button onClick={handleDecrement} className="px-3 py-1 text-lg-bold">
          -
        </button>
        <span className="mx-4 text-md-regular">{count}</span>
        <button onClick={handleIncrement} className="px-3 py-1 text-lg-bold">
          +
        </button>
      </div>
    </div>
  );
};

export default ParticipantCount;
