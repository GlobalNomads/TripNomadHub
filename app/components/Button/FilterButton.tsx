/*
    메인페이지 카테고리 필터 버튼: 버튼 오른쪽에 ▼ 아이콘 있음
*/

"use client";

import arrow from "@icon/ic_filter_arrow.svg";
import Image from "next/image";
import { FC } from "react";
import DefaultButton, { DefaultButtonProps } from "./DefaultButton";

const FilterButton: FC<DefaultButtonProps> = props => {
  return (
    <DefaultButton
      {...props}
      className={` ${props.className} flex h-[41px] w-[80px] items-center justify-between rounded-[15px] p-[12px] text-lg-medium md:h-[53px] md:w-[127px] md:p-[16px] md:text-2lg-medium xl:h-[53px] xl:w-[127px] xl:p-[16px] xl:text-2lg-medium`}
    >
      <span>{props.children}</span>
      <Image src={arrow} alt="filter icon" width={16} />
    </DefaultButton>
  );
};

export default FilterButton;
