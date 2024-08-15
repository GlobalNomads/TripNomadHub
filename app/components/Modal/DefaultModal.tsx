/*
 * DefaultModal(기본모달): `title(선택값) - children(본문) - footer(푸터: 버튼영역)`로 구성
 *- 열기(isOpen)/닫기(onClose) 기능
 *- 외부 영역 클릭 시 모달 창 닫힘
 *- 모달창 open 시 기본 bg-black 설정, 없애고 싶을 경우 "" 빈 문자열 전달하기
 *- `DefaultModalHeader`, `DefaultModalBody`, `DefaultModalFooter`로 모듈화되어, 조합을 통해 모달 구성 가능
 *- `title` 영역: title과 함께 x 버튼 표시, title 생략 가능
 */

"use client";

import close_x_button from "@icon/ic_btn_X_bold.svg";
import Image from "next/image";
import { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface DefaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayBackground?: string;
  className?: string;
}

const DefaultModal: FC<DefaultModalProps> = ({
  isOpen,
  onClose,
  children,
  overlayBackground = "bg-black bg-opacity-50",
  className = "",
  ...rest
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBackground}`} onClick={onClose}>
      <div className={`relative ${className} rounded-lg bg-white p-6`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export const ModalHeader: FC<{ title?: ReactNode; onClose: () => void }> = ({ title, onClose }) => (
  <div className="mb-4 flex w-full items-center justify-between">
    <h2>{title}</h2>
    <button onClick={onClose}>
      <Image src={close_x_button} className="md:w-10 xl:w-10" alt="닫기" />
    </button>
  </div>
);

export const ModalBody: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="relative flex flex-grow items-center justify-center overflow-y-auto">{children}</div>
);

export const ModalFooter: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => <div className={`mt-4 flex w-full ${className}`}>{children}</div>;

export default DefaultModal;
