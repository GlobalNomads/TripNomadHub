import React from "react";

function Label({ htmlFor, children }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-base font-normal leading-[26px] text-primary-black-200">
      {children}
    </label>
  );
}

export default Label;
