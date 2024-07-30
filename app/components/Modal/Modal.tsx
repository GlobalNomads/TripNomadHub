import CancelModal from "./CancelModal";
import ConfirmModal from "./ConfirmModal";
import DefaultModal from "./DefaultModal";
import ReviewModal from "./ReviewModal";

const Modal = {
  Default: DefaultModal,
  Confirm: ConfirmModal,
  Cancel: CancelModal,
  Review: ReviewModal,
};

export default Modal;
