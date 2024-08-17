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
    setIsOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete action triggered");
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <DropdownTrigger onClick={() => setIsOpen(!isOpen)}>
            <Image src={KebabBtn} alt="menu" width={32} height={32} />
          </DropdownTrigger>
        }
      >
        <div className="absolute right-0 mt-2 w-[140px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-[160px]">
          <DropdownItem
            onClick={handleEdit}
            className="block w-full items-center px-4 py-4 text-sm text-gray-700 hover:bg-gray-100"
          >
            수정하기
          </DropdownItem>
          <DropdownItem
            onClick={handleDelete}
            className="block w-full px-4 py-4 text-sm text-gray-700 hover:bg-gray-100"
          >
            삭제하기
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
};

export default DropDownMenu;
