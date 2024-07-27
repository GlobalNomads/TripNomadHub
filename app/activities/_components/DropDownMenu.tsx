"use client";

import KebabBtn from "@/app/assets/icon/ic_meatball.svg";
import Dropdown from "@/app/components/DropDown/DropDown";
import Image from "next/image";
import { FC } from "react";

const DropDownMenu: FC = () => {
  const handleEdit = () => {
    console.log("Edit action triggered");
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
  };

  const dropdownItems = [
    { label: "수정하기", action: handleEdit },
    { label: "삭제하기", action: handleDelete },
  ];

  return (
    <Dropdown
      items={dropdownItems}
      trigger={<Image src={KebabBtn} alt="menu" width={32} height={32} />}
      dropdownClassName="xl:text-lg md:text-lg text-sm"
      itemClassName="text-gray-600 font-medium w-[140px] xl:h-[58px] md:w-[160px] md:h-[58px] xl:w-[160px] xl:h-[58px]"
    />
  );
};

export default DropDownMenu;
