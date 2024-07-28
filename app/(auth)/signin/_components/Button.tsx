import React from "react";

function Button({ type, disabled, children }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const disabledClass = disabled ? "bg-primary-gray-200" : "bg-primary-green-200";

  return (
    <button
      type={type}
      disabled={disabled}
      className={`mt-8 w-full max-w-[400px] rounded-[10px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white ${disabledClass}`}
    >
      {children}
    </button>
  );
}

export default Button;
