/*
    예약내역 페이지 버튼: 후기작성, 예약취소
*/

"use client";

import { FC } from "react";
import DefaultButton from "./DefaultButton";

interface ReservationButtonProps {
  onClick: () => void;
}

export const WriteReviewButton: FC<ReservationButtonProps> = ({ onClick }) => {
  return (
    <DefaultButton
      type="nomadBlack"
      className="w-[80px] py-[6px] text-md-bold md:w-[112px] md:py-[7px] md:text-lg-bold xl:w-[144px] xl:py-2 xl:text-lg-bold"
      onClick={onClick}
    >
      후기 작성
    </DefaultButton>
  );
};

export const CancelReservationButton: FC<ReservationButtonProps> = ({ onClick }) => {
  return (
    <DefaultButton
      type="white"
      className="w-[80px] py-[6px] text-md-bold md:w-[112px] md:py-[7px] md:text-lg-bold xl:w-[144px] xl:py-2 xl:text-lg-bold"
      onClick={onClick}
    >
      예약 취소
    </DefaultButton>
  );
};
