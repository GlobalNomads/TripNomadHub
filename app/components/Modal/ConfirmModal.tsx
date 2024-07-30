/*
    ConfirmModal(확인모달): message는 모달의 정중앙, footer엔 확인 버튼 들어 있는 모달
    message를 넣어주세요
*/
"use client";

import { FC } from "react";
import Button from "../Button/Button";
import DefaultModal, { ModalFunctionProps } from "./DefaultModal";

interface ConfirmModalProps extends ModalFunctionProps {
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      width="w-[327px] md:w-[540px] xl:w-[540px]"
      height="h-[220px] md:h-[250px] xl:h-[250px]"
      padding="p-7"
      footer={
        <div className="flex w-full justify-center md:justify-end xl:justify-end">
          <Button.Modal type="nomadBlack" onClick={onConfirm}>
            확인
          </Button.Modal>
        </div>
      }
    >
      <div className="relative flex h-full w-full justify-center">
        <p className="lg-medium absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center font-medium md:text-2lg-medium xl:text-2lg-medium">
          {message}
        </p>
      </div>
    </DefaultModal>
  );
};

export default ConfirmModal;
