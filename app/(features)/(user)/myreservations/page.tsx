import React from "react";
import SideNavCard from "../../../components/SideNav/SideNavCard";
import ReservationCard from "./_components/ReservationCard";

const MyReservations: React.FC = () => {
  return (
    <div className="mx-auto flex gap-4 xl:gap-6">
      <div>
        <SideNavCard />
      </div>
      <div>
        <ReservationCard />
      </div>
    </div>
  );
};

export default MyReservations;
