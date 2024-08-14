"use client";
import Link from "next/link";

interface ButtonWithHoverProps {
  children?: React.ReactNode;
  href: string;
}

const DropDownBox = ({ children, href }: ButtonWithHoverProps) => {
  return (
    <span>
      <Link
        href={href}
        onMouseDown={e => {
          e.preventDefault();
        }}
        className="flex items-center text-md-medium text-primary-gray-800"
      >
        {children}
      </Link>
    </span>
  );
};

export default DropDownBox;
