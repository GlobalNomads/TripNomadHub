/*
  적용 컴포넌트: 체험 상세 페이지, 내 체험 관리 페이지의 
  Trigger(케밥 버튼) + DropDown 메뉴
  체험 상세 페이지에서는 체험 삭제 후 LandingPage로 이동,
  체험 관리 페이지에서는 체험 삭제 후 관리 페이지에 머물기
*/
"use client";

import deleteMyActivitiesId from "@api/MyActivities/deleteMyActivitiesId"; //체험 삭제 함수 호출
import KebabBtn from "@icon/ic_meatball.svg";
import Modal from "@modal/Modal";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import Dropdown, { DropdownItem } from "./DropDown";

interface ActivityEditDeleteProps {
  activityId: number;
}

const ActivityEditDelete: FC<ActivityEditDeleteProps> = ({ activityId }) => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로 가져오기
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
      setIsSuccessModalOpen(true);
    },
    onError: (error: any) => {
      let message = "삭제에 실패했습니다.";
      if (error instanceof Error && (error as any).response) {
        const statusCode = (error as any).response.status;

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
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      setModalMessage(message);
      setIsErrorModalOpen(true);
    },
  });

  const handleEdit = () => {
    router.push(`/myactivities/activity-edit/${activityId}`);
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

    // pathname이 정의되어 있는지 확인
    if (typeof pathname === "string") {
      // 조건에 따라 페이지 이동
      if (pathname.startsWith("/activity")) {
        router.push("/"); // landing page로 이동
      } else if (pathname.startsWith("/myactivities")) {
        router.refresh(); // 현재 페이지 새로고침
      }
    } else {
      console.error("pathname이 정의되지 않았습니다.");
    }
  };

  const dropdownItems: DropdownItem[] = [
    { label: "수정하기", action: handleEdit },
    { label: "삭제하기", action: handleDelete },
  ];

  return (
    <>
      <Dropdown
        items={dropdownItems}
        trigger={
          <Image
            src={KebabBtn}
            alt="menu"
            className="h-6 w-6 md:h-8 md:w-8" // 기본 24px * 24px, md 이상에서 32px * 32px
          />
        }
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

export default ActivityEditDelete;
