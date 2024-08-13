/*
  체험 상세 페이지 DropDown 메뉴 + 케밥 버튼
  Todo: 수정하기, 삭제하기 기능 및 페이지 연결하기
*/
"use client";

import Dropdown, { DropdownItem, DropdownTrigger } from "@dropdown/DropDown";
import KebabBtn from "@icon/ic_meatball.svg";
import Image from "next/image";
import { FC, useState } from "react";

const DropDownMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    console.log("Edit action triggered");
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <DropdownTrigger onClick={() => setIsOpen(!isOpen)}>
          <Image src={KebabBtn} alt="menu" width={32} height={32} />
        </DropdownTrigger>
      }
    >
      <DropdownItem onClick={handleEdit} className="w-[140px] p-4 md:w-[160px]">
        수정하기
      </DropdownItem>
      <DropdownItem onClick={handleDelete} className="w-[140px] p-4 md:w-[160px]">
        삭제하기
      </DropdownItem>
    </Dropdown>
  );
};

export default DropDownMenu;
