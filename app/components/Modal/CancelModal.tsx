/*
    CancelModal(취소모달): 아니오 & 취소하기 버튼 들어있는 모달
*/
"use client";

import Button from "@button/Button";
import check from "@icon/ic_check_inCircle.svg";
import Image from "next/image";
import { FC } from "react";
import DefaultModal, { ModalBody, ModalFooter } from "./DefaultModal";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  description: string;
}

const CancelModal: FC<CancelModalProps> = ({ isOpen, onClose, onCancel, description }) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} className="h-[184px] w-[300px]">
      <ModalBody>
        <div className="flex flex-col items-center">
          <Image src={check} width={24} alt="확인메시지" className="mb-4" />
          <p className="mb-4 text-center text-2lg-medium text-primary-black-100">{description}</p>
        </div>
      </ModalBody>
      <ModalFooter className="flex justify-center space-x-2">
        <Button.Default type="white" onClick={onClose} className="h-[38px] w-[80px] p-[7px]">
          아니오
        </Button.Default>
        <Button.Default type="nomadBlack" onClick={onCancel} className="h-[38px] w-[80px] p-[7px]">
          취소하기
        </Button.Default>
      </ModalFooter>
    </DefaultModal>
  );
};

export default CancelModal;
