/*
    Modal test page: 사용 예시 보여주기 위해 만든 페이지
    TODO: 최종 마무리 하기 전에 삭제하기
*/

"use client";

import Button from "@button/Button";
import React, { useState } from "react";
import Modal from "./Modal";

const ModalTest: React.FC = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <div className="space-y-4 p-20">
      <div>
        <Button.Default onClick={() => setConfirmModalOpen(true)}>로그인하기(확인 모달)</Button.Default>
        <Modal.Confirm
          isOpen={isConfirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={() => {
            setConfirmModalOpen(false);
          }}
          message="비밀번호가 일치하지 않습니다. "
        >
          <></> {/* 빈 React Fragment를 children으로 전달 */}
        </Modal.Confirm>
      </div>
      <div>
        <Button.Default onClick={() => setCancelModalOpen(true)}>예약취소하기(취소 모달)</Button.Default>
        <Modal.Cancel
          isOpen={isCancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          onCancel={() => {
            setCancelModalOpen(false);
          }}
          description="예약을 취소하시겠어요?"
        >
          <></> {/* 빈 React Fragment를 children으로 전달 */}
        </Modal.Cancel>
      </div>
      <div>
        <Button.Default onClick={() => setReviewModalOpen(true)}>후기 작성하기(리뷰 모달)</Button.Default>
        <Modal.Review
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={() => {
            setReviewModalOpen(false);
          }}
        >
          <></> {/* 빈 React Fragment를 children으로 전달 */}
        </Modal.Review>
      </div>
    </div>
  );
};

export default ModalTest;
