"use client";
// import Dropdown from "@/components/DropDown/DropDown";
// import filterArrow from "@icon/ic_filter_arrow.svg";
// import Image from "next/image";
import React from "react";
// import dropdownItems from "./_components/DropdownItems";
import ReservationCard from "./_components/ReservationCard";

const MyReservations: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-3 text-3xl-bold">예약 내역</div>
        <div>
          {/* <Dropdown
            items={dropdownItems}
            trigger={
              <button className="hidden h-[53px] w-40 rounded-[15px] border border-solid border-primary-green-300 px-5 py-[13.5px] text-primary-green-300 xl:block">
                <div className="flex items-center justify-between">
                  <span className="text-2lg-medium">필터</span>
                  <Image src={filterArrow} alt="화살표" width={18} height={18} />
                </div>
              </button>
            }
            itemClassName="w-40 "
          /> */}
        </div>
      </div>

      <div className="h-full w-full">
        <ReservationCard />
      </div>
    </div>
  );
};

export default MyReservations;
