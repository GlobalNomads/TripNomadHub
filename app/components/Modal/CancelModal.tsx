/*
    CancelModal(취소모달): 아니오 & 취소하기 버튼 들어있는 모달
*/
"use client";

import check from "@/app/assets/icon/ic_check_inCircle.svg";
import Image from "next/image";
import { FC } from "react";
import Button from "../Button/Button";
import DefaultModal, { ModalFunctionProps } from "./DefaultModal";

interface CancelModalProps extends ModalFunctionProps {
  onCancel: () => void;
  description: string;
}

const CancelModal: FC<CancelModalProps> = ({ isOpen, onClose, onCancel, description }) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      width="w-[298px]"
      height="h-[184px]"
      footer={
        <div className="mt-4 flex w-full justify-center space-x-2">
          <Button.Default type="white" onClick={onClose} className="h-[38px] w-[80px] p-[7px]">
            아니오
          </Button.Default>
          <Button.Default type="nomadBlack" onClick={onCancel} className="h-[38px] w-[80px] p-[7px]">
            취소하기
          </Button.Default>
        </div>
      }
    >
      <div className="flex flex-col items-center">
        <Image src={check} width={24} alt="확인" className="mb-4" />
        <p className="mb-4 text-center text-2lg-medium text-primary-black-100">{description}</p>
      </div>
    </DefaultModal>
  );
};

export default CancelModal;
