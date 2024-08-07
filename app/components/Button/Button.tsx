"use client";

import CategoryButton from "./CategoryButton";
import DefaultButton from "./DefaultButton";
import FilterButton from "./FilterButton";
import LoginButton from "./LoginButton";
import ModalButton from "./ModalButton";
import { CancelReservationButton, WriteReviewButton } from "./ReservationButtons";
import SearchButton from "./SearchButton";
import SubmitButton from "./SubmitButton";

const Button = Object.assign(DefaultButton, {
  Default: DefaultButton,
  Login: LoginButton,
  Category: CategoryButton,
  Filter: FilterButton,
  Search: SearchButton,
  Submit: SubmitButton,
  Modal: ModalButton,
  WriteReview: WriteReviewButton,
  CancelReservation: CancelReservationButton,
});

export default Button;
