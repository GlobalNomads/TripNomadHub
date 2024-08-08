/*
    페이지네이션용 버튼: Pagination 컴포넌트용 버튼입니다
*/

import React from "react";
import DefaultButton, { DefaultButtonProps } from "./DefaultButton";

interface PaginationButtonProps extends DefaultButtonProps {
  isActive?: boolean;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({ isActive = false, children, ...props }) => {
  const activeClasses = "primary-green-300 text-white";
  const defaultClasses = "border bg-primary-green-100 border-primary-gray-300";

  return (
    <DefaultButton
      className={`flex h-10 w-10 items-center justify-center p-0 ${isActive ? activeClasses : defaultClasses}`}
      {...props}
    >
      {children}
    </DefaultButton>
  );
};

export default PaginationButton;
