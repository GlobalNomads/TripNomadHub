"use client";
import Dropdown from "@/components/DropDown/DropDown";
import filterArrow from "@icon/ic_filter_arrow.svg";
import Image from "next/image";
import { FC } from "react";

type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

interface DropdownItemsProps {
  setSelectedStatus: (status: ReservationStatus) => void;
}

const DropdownItems: FC<DropdownItemsProps> = ({ setSelectedStatus }) => {
  const dropdownItems: { label: string; value: ReservationStatus }[] = [
    { label: "예약 신청", value: "pending" },
    { label: "예약 취소", value: "canceled" },
    { label: "예약 승인", value: "confirmed" },
    { label: "예약 거절", value: "declined" },
    { label: "체험 완료", value: "completed" },
  ];

  return (
    <Dropdown
      items={dropdownItems.map(item => ({
        label: item.label,
        action: () => setSelectedStatus(item.value),
      }))}
      trigger={
        <div className="hidden h-[53px] w-40 rounded-[15px] border border-solid border-primary-green-300 px-5 py-[13.5px] text-primary-green-300 xl:block">
          <div className="flex items-center justify-between">
            <span className="text-2lg-medium">필터</span>
            <Image src={filterArrow} alt="Arrow" width={18} height={18} />
          </div>
        </div>
      }
      itemClassName="w-40"
      triggerClassName="bg-white"
    />
  );
};

export default DropdownItems;
