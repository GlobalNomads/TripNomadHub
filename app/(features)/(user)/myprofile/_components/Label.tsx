import React from "react";

function Label({ htmlFor, children }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-2xl-bold">
      {children}
    </label>
  );
}

export default Label;
