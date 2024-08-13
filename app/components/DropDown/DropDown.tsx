/*
  DropDown 메뉴 만들기 위한 공용 컴포넌트
*/
"use client";

import { FC, ReactNode, useEffect, useRef } from "react";

// Dropdown 관련 인터페이스
interface DropdownProps {
  trigger: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Dropdown 컴포넌트
const Dropdown: FC<DropdownProps & React.HTMLAttributes<HTMLDivElement>> = ({
  trigger,
  isOpen,
  onClose,
  children,
  ...rest
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={menuRef} {...rest}>
      <div>{trigger}</div>
      {isOpen && <div className="absolute right-0 z-10 mt-2 rounded bg-white shadow-lg">{children}</div>}
    </div>
  );
};

// Dropdown Trigger 컴포넌트
export const DropdownTrigger: FC<
  { onClick: () => void; children: ReactNode } & React.HTMLAttributes<HTMLButtonElement>
> = ({ onClick, children, ...rest }) => (
  <button onClick={onClick} {...rest}>
    {children}
  </button>
);

// Dropdown Item 컴포넌트
export const DropdownItem: FC<{ onClick: () => void; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
  children,
  ...rest
}) => (
  <div
    onClick={onClick}
    className="md-medium w-full cursor-pointer rounded border border-solid border-primary-gray-300 p-2 px-4 py-2 text-center text-gray-600 hover:bg-primary-green-100 hover:text-primary-black-100 focus:outline-none md:text-2lg-medium xl:text-2lg-medium"
    {...rest}
  >
    {children}
  </div>
);

export default Dropdown;
