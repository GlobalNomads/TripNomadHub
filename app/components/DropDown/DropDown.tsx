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
  dropdownClassName?: string;
}

const Dropdown: FC<DropdownProps> = ({ trigger, isOpen, onClose, children, dropdownClassName = "" }) => {
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
    <div className="relative inline-block" ref={menuRef}>
      <div>{trigger}</div>
      {isOpen && (
        <ul
          className={`absolute right-0 z-10 mt-2 rounded border border-solid border-primary-gray-300 bg-white shadow-lg ${dropdownClassName}`}
        >
          {children}
        </ul>
      )}
    </div>
  );
};

// Dropdown Trigger 컴포넌트
export const DropdownTrigger: FC<{ onClick: () => void; children: ReactNode }> = ({ onClick, children }) => (
  <button onClick={onClick} className="flex items-center justify-center">
    {children}
  </button>
);

// Dropdown Item 컴포넌트
export const DropdownItem: FC<{ onClick: () => void; children: ReactNode; className?: string }> = ({
  onClick,
  children,
  className = "",
}) => (
  <li className={`rounded p-2 ${className}`}>
    <button
      onClick={onClick}
      className="md-medium w-full rounded px-4 py-2 text-center text-gray-600 hover:bg-primary-green-100 hover:text-primary-black-100 focus:outline-none md:text-2lg-medium xl:text-2lg-medium"
    >
      {children}
    </button>
  </li>
);

export default Dropdown;
