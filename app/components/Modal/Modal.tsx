import CancelModal from "./CancelModal";
import ConfirmModal from "./ConfirmModal";
import CurrentReservationsModal from "./CurrentReservationsModal";
import DefaultModal from "./DefaultModal";
import ReviewModal from "./ReviewModal";

const Modal = {
  Default: DefaultModal,
  Confirm: ConfirmModal,
  Cancel: CancelModal,
  CurrentReservations: CurrentReservationsModal,
  Review: ReviewModal,
};

export default Modal;
