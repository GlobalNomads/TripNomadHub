import React from "react";
import ReservationCard from "./_components/ReservationCard";
import SideNavCard from "./_components/SideNavCard";

const MyReservations: React.FC = () => {
  return (
    <div>
      <div className="mb-3 text-3xl-bold">예약 내역</div>
      <SideNavCard />
      <ReservationCard />
    </div>
  );
};

export default MyReservations;
