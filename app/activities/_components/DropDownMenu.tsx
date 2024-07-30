/*
  체험 상세 페이지 DropDown 메뉴 + 케밥 버튼
  Todo: 수정하기, 삭제하기 기능 및 페이지 연결하기
*/

"use client";

import KebabBtn from "@/assets/icon/ic_meatball.svg";
import Dropdown, { DropdownItem } from "@/components/DropDown/DropDown";
import Image from "next/image";
import { FC } from "react";

const DropDownMenu: FC = () => {
  const handleEdit = () => {
    console.log("Edit action triggered");
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
  };

  const dropdownItems: DropdownItem[] = [
    { label: "수정하기", action: handleEdit },
    { label: "삭제하기", action: handleDelete },
  ];

  return (
    <Dropdown
      items={dropdownItems}
      trigger={<Image src={KebabBtn} alt="menu" width={32} height={32} />}
      itemClassName="w-[140px] xl:h-[58px] md:w-[160px] md:h-[58px] xl:w-[160px] xl:h-[58px]"
    />
  );
};

export default DropDownMenu;
