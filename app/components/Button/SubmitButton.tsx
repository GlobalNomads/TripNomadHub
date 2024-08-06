/*
    제출 버튼: 조건을 만족하지 않으면 enable되어 gray 색상 -> 조건 만족시 nomadBlack 색상으로 변하며 action 수행 가능
*/

"use client";

import React, { MouseEventHandler, ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, disabled = false, className = "", onClick }) => {
  const baseClasses = "rounded text-lg-bold p-2 w-full h-14";
  const typeClasses = disabled ? "bg-primary-gray-400 cursor-not-allowed" : "bg-primary-black-100 text-white";
  const combinedClasses = `${baseClasses} ${typeClasses} ${className}`;

  return (
    <button disabled={disabled} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default SubmitButton;
