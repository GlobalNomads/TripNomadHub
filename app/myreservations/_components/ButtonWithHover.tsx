"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";

interface ButtonWithHoverProps {
  children?: React.ReactNode;
  defaultIcon: string;
  hoverIcon: string;
  href: string;
}

const ButtonWithHover = ({ children, defaultIcon, hoverIcon, href }: ButtonWithHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useLayoutEffect(() => {
    setIsActive(pathname === href);
  }, [pathname, href]);

  const activeClass = isHovered || isActive ? "bg-primary-green-100 text-primary-black-100" : "";

  return (
    <Link href={href}>
      <button
        className={`${activeClass} flex h-[44px] w-[203px] cursor-pointer items-center rounded-2xl pl-4 text-lg-bold xl:w-[336px]`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-center gap-3.5">
          <Image src={isHovered || isActive ? hoverIcon : defaultIcon} width={24} height={24} alt="icon" />
          <div>{children}</div>
        </div>
      </button>
    </Link>
  );
};

export default ButtonWithHover;
