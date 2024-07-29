import React from "react";

function Button({ type, disabled, children }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`mt-6 w-full max-w-[640px] rounded-[6px] bg-primary-gray-600 py-[10.5px] text-lg-semibold text-white`}
    >
      {children}
    </button>
  );
}

export default Button;
