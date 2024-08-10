import React, { forwardRef } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationCheck?: boolean;
}

export default forwardRef(function Input(
  { validationCheck, ...rest }: IInputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  return (
    <input
      autoComplete="off"
      className={`box-border w-full max-w-[790px] rounded-md border border-primary-gray-700 px-4 py-3 text-sm leading-[1.7] text-primary-gray-600 outline-0 placeholder:text-[#8F95B2] ${
        validationCheck
          ? "bg-primary-red-100 focus:border-primary-red-100 focus:bg-primary-red-100"
          : "bg-primary-gray-100 focus:border-primary-green-200 focus:bg-white"
      }`}
      ref={ref}
      {...rest}
    />
  );
});
