/*
    제출 버튼: 조건을 만족하지 않으면 enable되어 gray 색상 -> 조건 만족시 nomadBlack 색상으로 변하며 action 수행 가능
*/

"use client";

import React, { MouseEventHandler, ReactNode } from "react";

export type ButtonType = "enable" | "nomadBlack";

interface SubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonType; // 이제 새롭게 정의된 ButtonType을 사용
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  type = "enable",
  children,
  disabled = false,
  className = "",
  onClick,
}) => {
  const baseClasses = "rounded-[4px] text-lg-bold p-[8px] w-full h-56px";
  const typeClasses =
    {
      enable: "bg-gray-400",
      nomadBlack: "bg-primary-black-100 text-white",
    }[type] || "";

  const combinedClasses = `${baseClasses} ${typeClasses} ${className}`;

  return (
    <button disabled={disabled} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default SubmitButton;
