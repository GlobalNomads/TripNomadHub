"use client";
import React, { useState } from "react";
import DropdownItems from "./_components/DropdownItems";
import ReservationCard from "./_components/ReservationCard";

type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

const MyReservations: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | undefined>(undefined);
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-3 text-3xl-bold">예약 내역</div>
        <div>
          <DropdownItems setSelectedStatus={setSelectedStatus} />
        </div>
      </div>
      <div className="h-full w-full">
        <ReservationCard selectedStatus={selectedStatus} />
      </div>
    </div>
  );
};

export default MyReservations;
