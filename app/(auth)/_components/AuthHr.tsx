import { PropsWithChildren } from "react";

function AuthHr({ children }: PropsWithChildren) {
  return (
    <div className="relative my-4 flex items-center justify-center">
      <hr className="w-full border-t border-gray-300" />
      <span className="absolute bg-white px-4 text-xl-regular text-primary-gray-450">{children}</span>
    </div>
  );
}

export default AuthHr;
