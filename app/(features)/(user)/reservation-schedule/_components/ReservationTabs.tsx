import { FC } from "react";

interface ScheduleData {
  declined: number;
  confirmed: number;
  pending: number;
}

interface ReservationTabsProps {
  activeTab: "pending" | "confirmed" | "declined";
  setActiveTab: (tab: "pending" | "confirmed" | "declined") => void;
  scheduleData: ScheduleData; // 전체 count 데이터를 받는 인터페이스
}

const ReservationTabs: FC<ReservationTabsProps> = ({ activeTab, setActiveTab, scheduleData }) => {
  return (
    <div className="mb-2 flex space-x-4 text-xl-regular">
      {["pending", "confirmed", "declined"].map(tab => (
        <div
          key={tab}
          className={`cursor-pointer ${
            activeTab === tab
              ? "border-b-4 border-solid border-primary-green-300 font-bold text-primary-green-300"
              : "text-primary-black-200"
          }`}
          onClick={() => setActiveTab(tab as "pending" | "confirmed" | "declined")}
        >
          {tab === "pending"
            ? `신청 ${scheduleData.pending}`
            : tab === "confirmed"
              ? `승인 ${scheduleData.confirmed}`
              : `거절 ${scheduleData.declined}`}
        </div>
      ))}
    </div>
  );
};

export default ReservationTabs;
