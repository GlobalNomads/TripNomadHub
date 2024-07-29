/*
    로그인&회원가입 페이지 버튼: width를 어떤 스타일로 적용할 지 몰라서 height만 속성 정해놨습니다. 적용하시는 스타일대로 변경 후 사용하시면 될 것 같습니다.
*/

"use client";

import { FC } from "react";
import DefaultButton, { DefaultButtonProps } from "./DefaultButton";

const LoginButton: FC<DefaultButtonProps> = props => {
  return (
    <DefaultButton
      {...props}
      className={` ${props.className} h-[48px] items-center rounded-[6px] p-[14px] text-center text-lg-bold`}
    />
  );
};

export default LoginButton;
