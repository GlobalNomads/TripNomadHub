"use client";

import CategoryButton from "./CategoryButton";
import DefaultButton from "./DefaultButton";
import FilterButton from "./FilterButton";
import LoginButton from "./LoginButton";
import ModalButton from "./ModalButton";
import SearchButton from "./SearchButton";

const Button = Object.assign(DefaultButton, {
  Default: DefaultButton,
  Login: LoginButton,
  Category: CategoryButton,
  Filter: FilterButton,
  Search: SearchButton,
  Modal: ModalButton,
});

export default Button;
