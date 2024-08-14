"use client";

import Modal from "@modal/Modal";
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
    />
  );
};

export default ReviewModal;
