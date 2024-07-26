"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (pathname === href) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, href]);

  const activeClass = isHovered || isActive ? "bg-primary-green-100 text-primary-black-100" : "";

  return (
    <Link href={href}>
      <button
        className={`${activeClass} flex h-[44px] w-[203px] cursor-pointer items-center justify-center gap-3.5 rounded-2xl text-lg-bold`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={isHovered || isActive ? hoverIcon : defaultIcon} width={24} height={24} alt="icon" />
        <div>{children}</div>
      </button>
    </Link>
  );
};

export default ButtonWithHover;
