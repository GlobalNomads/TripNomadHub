"use client";

import Modal from "@/components/Modal/Modal";
import React from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal.Review
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {
        onClose();
      }}
    >
      <></> {/* 빈 React Fragment를 children으로 전달 */}
    </Modal.Review>
  );
};

export default ReviewModal;
