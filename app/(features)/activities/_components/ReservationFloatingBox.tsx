/*
    예약용 플로팅 박스
*/
import React from "react";
import ParticipantCount from "./ParticipantCount";
import PriceInfo from "./PriceInfo";
import ScheduleSelector from "./ScheduleSelector";
import TotalPrice from "./TotalPrice";

const ReservationFloatingBox: React.FC = () => {
  return (
    <div>
      <h2>예약용 플로팅 박스</h2>
      <PriceInfo />
      <ScheduleSelector />
      <ParticipantCount />
      <TotalPrice />
    </div>
  );
};

export default ReservationFloatingBox;
