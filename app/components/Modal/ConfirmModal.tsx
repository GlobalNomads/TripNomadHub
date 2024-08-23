/*
    ConfirmModal(확인모달): message는 모달의 정중앙, footer엔 확인 버튼 들어 있는 모달
    message를 넣어주세요
*/
"use client";

import Button from "@button/Button";
import { FC } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-[220px] w-[320px] flex-col items-center justify-center rounded-lg md:h-[250px] md:w-[540px]"
    >
      <ModalHeader onClose={onClose} className="hidden md:flex" />
      <ModalBody>
        <p className="text-center text-lg">{message}</p>
      </ModalBody>
      <ModalFooter className="flex justify-center md:justify-end">
        <Button.Modal type="nomadBlack" onClick={onConfirm}>
          확인
        </Button.Modal>
      </ModalFooter>
    </DefaultModal>
  );
};

export default ConfirmModal;
