/*
    DefaultModal(기본모달): `title(선택값)-children(본문)-footer(푸터: 의도- 버튼영역)`로 구성
    - 열기/닫기 기능
    - 외부 영역 클릭시 모달 창 닫아짐
    - BorderRadius 12px가 기본값 & 변경 가능
    - 모달창 open시 기본 bg-black 설정되어있음, 없애고 싶을 경우 "" 빈 문자열 전달하기
    - centered: description을 모달 중앙에 오게 하기(true), 기본값은 false
    - footerAlignment 값을 설정하여 footer의 위치를 조정 가능(기본: 중앙정렬)
    - title영역: title과 함께 x 버튼 필요한 경우 활성화
*/
"use client";

import closebtn from "@/app/assets/icon/ic_btn_X_bold.svg";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

export interface ModalFunctionProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export interface ModalDesignProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  overlayBackground?: string;
  backgroundColor?: string;
  padding?: string;
}

const DefaultModal: FC<ModalFunctionProps & ModalDesignProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = "w-auto",
  height = "h-auto",
  borderRadius = "rounded-lg",
  overlayBackground = "bg-black bg-opacity-50",
  backgroundColor = "bg-white",
  padding = "p-6",
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${overlayBackground}`} onClick={onClose}>
      <div
        className={`relative ${backgroundColor} ${width} ${height} ${borderRadius} ${padding} flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="mb-4 flex w-full items-center justify-between">
            <h2>{title}</h2>
            <div>
              <button onClick={onClose}>
                <Image src={closebtn} className="md:w-10 xl:w-10" alt="닫기" />
              </button>
            </div>
          </div>
        )}
        <div className="relative flex flex-grow items-center justify-center">{children}</div>
        {footer && (
          <div className="mt-4 flex w-full" style={{ marginTop: "auto" }}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default DefaultModal;
