/*
    ReviewModal(후기작성 모달): 현재는 틀만 만들어뒀습니다! 실제 사용하려면 많이 수정해서 써야 합니다!
    bg-primary-green-100로 영역 표시만 해 뒀습니다.
    TODO: 마음껏 변경하셔도 됩니다...!
*/

"use client";

import Button from "@button/Button";
import StarOff from "@icon/ic_star_off.svg";
import Image from "next/image";
import { FC } from "react";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} className="md:h-[750px] md:w-[480px]">
      <ModalHeader title={<div className="text-2xl-bold">후기 작성</div>} onClose={onClose} />
      <ModalBody>
        <div className="flex max-h-[calc(100vh-200px)] flex-grow flex-col items-center overflow-y-auto">
          <div className="h-[140px] w-full bg-primary-green-100">{/* 체험정보 불러오는 란 */}</div>
          <div className="mb-[24px] mt-[24px] flex h-[100px] w-full items-center justify-center gap-[5px]">
            <Image src={StarOff} alt="빈 별" width={56} height={56} />
            <Image src={StarOff} alt="빈 별" width={56} height={56} />
            <Image src={StarOff} alt="빈 별" width={56} height={56} />
            <Image src={StarOff} alt="빈 별" width={56} height={56} />
            <Image src={StarOff} alt="빈 별" width={56} height={56} />
          </div>
          <textarea
            className="mt-4 h-24 w-full border border-primary-gray-700 px-4 py-2 md:h-60"
            placeholder="후기를 작성해주세요"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button.Default type="nomadBlack" onClick={onSubmit} className="h-[38px] w-full p-[7px] md:h-[56px]">
          작성하기
        </Button.Default>
      </ModalFooter>
    </DefaultModal>
  );
};

export default ReviewModal;
