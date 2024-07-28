/*
  기본 Button 컴포넌트: 타입만 3가지로 지정되어있습니다. 
  button list에 없는 버튼 만들때 타입만 정해서 className 설정하여padding, size등 자유롭게 지정해서 사용하시면 됩니다.
*/

"use client";

import { FC, MouseEventHandler, ReactNode } from "react";

export type ButtonType = "white" | "nomadBlack" | "disabled";

export interface DefaultButtonProps {
  type?: ButtonType;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const DefaultButton: FC<DefaultButtonProps> = ({
  type = "white",
  children,
  disabled = false,
  className = "",
  onClick,
}) => {
  const baseClasses = "border-box select-none rounded transition-colors duration-200 font-medium border";

  const typeClasses = {
    white: "bg-white border-primary-green-300 text-primary-black-100",
    nomadBlack: "bg-primary-black-100 border-primary-black-100 text-white",
    disabled: "bg-primary-gray-600 border-primary-gray-600 text-white cursor-not-allowed",
  }[type];

  return (
    <button
      disabled={disabled || type === "disabled"}
      className={`${baseClasses} ${typeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
