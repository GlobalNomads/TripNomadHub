import React from "react";

function Label({ htmlFor, children, ...rest }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className="text-2xl-bold" {...rest}>
      {children}
    </label>
  );
}

export default Label;
