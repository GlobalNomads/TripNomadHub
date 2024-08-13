"use client";

import Button from "@button/Button"; // Button 컴포넌트 경로가 맞는지 확인
import React, { useState } from "react";
import Modal from "./Modal";

const ModalTest: React.FC = () => {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  console.log("ModalTest 컴포넌트 렌더링");

  return (
    <div className="space-y-4 p-20">
      <div>
        <Button.Default onClick={() => setConfirmModalOpen(true)}>로그인하기(확인 모달)</Button.Default>
        <Modal.Confirm
          isOpen={isConfirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={() => setConfirmModalOpen(false)}
          message="비밀번호가 일치하지 않습니다."
        />
      </div>

      <div>
        <Button.Default onClick={() => setCancelModalOpen(true)}>예약취소하기(취소 모달)</Button.Default>
        <Modal.Cancel
          isOpen={isCancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          onCancel={() => setCancelModalOpen(false)}
          description="예약을 취소하시겠어요?"
        />
      </div>

      <div>
        <Button.Default onClick={() => setReviewModalOpen(true)}>후기 작성하기(리뷰 모달)</Button.Default>
        <Modal.Review
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={() => setReviewModalOpen(false)}
        />
      </div>

      <div>
        <Button.Default onClick={() => setReviewModalOpen(true)}>후기 작성하기(예약 정보 모달)</Button.Default>
        <Modal.CurrentReservations
          isOpen={isReviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={() => setReviewModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ModalTest;
