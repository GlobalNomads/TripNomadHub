/*
    검색 버튼: tablet(md)&PC(xl) 버전과 기본 버전의 width가 다름
*/

"use client";

import { FC } from "react";
import DefaultButton, { DefaultButtonProps } from "./DefaultButton";

const SearchButton: FC<DefaultButtonProps> = props => {
  return (
    <DefaultButton
      {...props}
      type={props.type || "nomadBlack"}
      className={` ${props.className} h-[56px] w-[96px] rounded-[4px] p-[8px] text-lg-bold md:w-[136px] xl:w-[136px]`}
    />
  );
};

export default SearchButton;
