import React from "react";
import ReservationCard from "./_components/ReservationCard";

const MyReservations: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-3 text-3xl-bold">예약 내역</div>
      <div className="h-full w-full">
        <ReservationCard />
      </div>
    </div>
  );
};

export default MyReservations;
