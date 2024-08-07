/*
    모달창 버튼: tablet(md)&PC(xl) 버전과 기본 버전의 UI가 다름
*/

"use client";

import { FC } from "react";
import DefaultButton, { DefaultButtonProps } from "./DefaultButton";

const ModalButton: FC<DefaultButtonProps> = props => {
  return (
    <DefaultButton
      {...props}
      className={`h-[42px] w-[138px] rounded-[8px] p-[12px] text-[14px] md:h-[48px] md:w-[120px] md:p-[14px] md:text-[16px] xl:h-[48px] xl:w-[120px] xl:p-[14px] xl:text-[16px] ${props.className}`}
    >
      {props.children}
    </DefaultButton>
  );
};

export default ModalButton;
