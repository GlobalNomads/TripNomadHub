import CurrentReservationsModal from "../../(features)/(user)/reservation-schedule/_components/CurrentReservationsModal";
import CancelModal from "./CancelModal";
import ConfirmModal from "./ConfirmModal";
import DefaultModal, { ModalBody, ModalFooter, ModalHeader } from "./DefaultModal";
import ReviewModal from "./ReviewModal";

const Modal = {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader,
  Default: DefaultModal,
  Confirm: ConfirmModal,
  Cancel: CancelModal,
  CurrentReservations: CurrentReservationsModal,
  Review: ReviewModal,
};

export default Modal;
