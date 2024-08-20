/*
  체험 상세 페이지 DropDown 메뉴 + 케밥 버튼
  Todo: 수정하기 페이지 연결하기
*/
"use client";

import deleteMyActivitiesId from "@api/MyActivities/deleteMyActivitiesId";
import Dropdown, { DropdownItem } from "@dropdown/DropDown";
import KebabBtn from "@icon/ic_meatball.svg";
import Modal from "@modal/Modal";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface DropDownMenuProps {
  activityId: number;
}

const DropDownMenu: FC<DropDownMenuProps> = ({ activityId }) => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      return deleteMyActivitiesId(activityId);
    },
    onSuccess: () => {
      setModalMessage("삭제가 완료되었습니다.");
      setIsSuccessModalOpen(true); // 성공 모달 열기
    },
    onError: (error: any) => {
      let message = "삭제에 실패했습니다.";
      if (error.response) {
        const statusCode = error.response.status;

        switch (statusCode) {
          case 400:
            message = "신청 예약이 있는 체험은 삭제할 수 없습니다.";
            break;
          case 401:
            message = "권한이 없습니다.";
            break;
          case 403:
            message = "본인의 체험만 삭제할 수 있습니다.";
            break;
          case 404:
            message = "존재하지 않는 체험입니다.";
            break;
          default:
            message = `서버 오류: ${statusCode}`;
        }
      } else if (error.message) {
        message = error.message;
      }

      setModalMessage(message);
      setIsErrorModalOpen(true); // 에러 모달 열기
    },
  });

  const handleEdit = () => {
    console.log("Edit action triggered");
  };

  const handleDelete = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    mutation.mutate();
    setIsConfirmModalOpen(false);
  };

  const handleSuccessConfirm = () => {
    setIsSuccessModalOpen(false);
    router.push("/");
  };

  const dropdownItems: DropdownItem[] = [
    { label: "수정하기", action: handleEdit },
    { label: "삭제하기", action: handleDelete },
  ];

  return (
    <>
      <Dropdown
        items={dropdownItems}
        trigger={<Image src={KebabBtn} alt="menu" width={32} height={32} />}
        itemClassName="w-[140px] md:w-[160px] h-[58px]"
      />
      <Modal.Confirm
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        message="이 체험을 삭제하시겠습니까?"
      />
      <Modal.Confirm
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        onConfirm={() => setIsErrorModalOpen(false)}
        message={modalMessage}
      />
      <Modal.Confirm
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessConfirm}
        onConfirm={handleSuccessConfirm}
        message={modalMessage}
      />
    </>
  );
};

export default DropDownMenu;

////
// ////
// return (
//   <Dropdown
//     items={dropdownItems}
//     trigger={
//       <FilterButton className="h-[41px] w-[80px] p-[12px] text-lg-medium md:h-[53px] md:w-[127px] md:p-[16px] md:text-2lg-medium whitespace-nowrap">
//         {inputLabel}
//       </FilterButton>
//     }
//     dropdownClassName="w-full text-[10px] md:w-auto overflow-y-scroll scroll-smooth max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]"
//     itemClassName="text-[10px] sm:text-sm md:text-md-medium lg:text-lg-medium"
//   />
// );
// };
