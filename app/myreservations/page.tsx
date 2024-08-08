import React from "react";
import SideNavCard from "../components/SideNavCard";
import ReservationCard from "./_components/ReservationCard";

const MyReservations: React.FC = () => {
  return (
    <div className="mx-auto flex gap-4 xl:gap-6">
      <SideNavCard />
      <ReservationCard />
    </div>
  );
};

export default MyReservations;
