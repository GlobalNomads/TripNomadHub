import React from "react";
import ReservationCard from "./_components/ReservationCard";
import SideNavCard from "./_components/SideNavCard";

const MyReservations: React.FC = () => {
  return (
    <div className="mx-auto flex gap-4 xl:gap-6">
      <SideNavCard />
      <ReservationCard />
    </div>
  );
};

export default MyReservations;
