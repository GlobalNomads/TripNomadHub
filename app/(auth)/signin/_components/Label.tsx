import React from "react";

function Label({ htmlFor, children }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-sm leading-[1.7] text-primary-gray-500">
      {children}
    </label>
  );
}

export default Label;
