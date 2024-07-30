import { PropsWithChildren } from "react";

function ErrorText({ children }: PropsWithChildren) {
  return <p className="text-xs leading-[1.5] text-primary-red-200">{children}</p>;
}

export default ErrorText;
