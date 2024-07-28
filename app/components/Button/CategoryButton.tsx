/*
    메인페이지 카테고리 분류 버튼: 기본 white, 선택하면 nomadBlack으로 변경됨
*/
"use client";

import { FC, MouseEvent, useState } from "react";
import DefaultButton, { DefaultButtonProps } from "./DefaultButton";

const CategoryButton: FC<DefaultButtonProps> = props => {
  const [selected, setSelected] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setSelected(!selected);
    if (props.onClick) {
      props.onClick(event);
    }
  };

  return (
    <DefaultButton
      {...props}
      type={selected ? "nomadBlack" : "white"}
      onClick={handleClick}
      className={` ${props.className} h-[41px] w-[80px] rounded-[15px] p-[7px] text-md-medium md:h-[58px] md:w-[120px] md:p-[16px] md:text-2lg-medium xl:h-[58px] xl:w-[127px] xl:p-[16px] xl:text-2lg-medium`}
    >
      {props.children}
    </DefaultButton>
  );
};

export default CategoryButton;
