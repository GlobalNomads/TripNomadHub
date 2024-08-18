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
      className="h-[32px] w-[80px] text-md-bold md:h-10 md:w-[112px] md:text-lg-bold xl:h-[43.08px] xl:w-[144px] xl:text-lg-bold"
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
      className="h-[32px] w-[80px] text-md-bold md:h-10 md:w-[112px] md:text-lg-bold xl:h-[43.08px] xl:w-[144px] xl:text-lg-bold"
      onClick={onClick}
    >
      예약 취소
    </DefaultButton>
  );
};
