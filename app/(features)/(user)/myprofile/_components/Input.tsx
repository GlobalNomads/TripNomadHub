import useBoolean from "@/hooks/useBoolean";
import UnLockIcon from "@icon/ic_btn_visibility_off.svg";
import LockIcon from "@icon/ic_btn_visibility_on.svg";
import Image from "next/image";
import React, { forwardRef, useState } from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationCheck?: boolean;
  disabledCheck?: boolean;
}

export default forwardRef(function Input(
  { validationCheck, type, disabledCheck, ...rest }: IInputProps,
  ref: React.LegacyRef<HTMLInputElement>,
) {
  const [inputType, setInputType] = useState(type);
  const { value: password, handleToggle: togglePassword } = useBoolean();

  const handleIconClick = () => {
    togglePassword();
    setInputType(password ? "password" : "text");
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        autoComplete="off"
        className={`box-border w-full max-w-[790px] rounded-md border border-primary-gray-400 px-4 py-3 text-sm-medium text-primary-black-200 outline-0 placeholder:text-[#8F95B2] ${
          validationCheck
            ? "bg-primary-red-100 focus:border-primary-red-100 focus:bg-primary-red-100"
            : "bg-primary-gray-100 focus:border-primary-green-200 focus:bg-white"
        } ${disabledCheck && "bg-primary-gray-200 text-primary-gray-700"}`}
        ref={ref}
        {...rest}
      />
      {type === "password" && (
        <span className="absolute right-[3%] top-[25%] max-w-[24px]" onClick={handleIconClick}>
          {password ? <Image src={UnLockIcon} alt="비밀번호 보기" /> : <Image src={LockIcon} alt="비밀번호 감추기" />}
        </span>
      )}
    </div>
  );
});
