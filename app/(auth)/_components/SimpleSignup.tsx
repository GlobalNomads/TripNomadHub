"use client";

import GoogleIcon from "@icon/ic_google.svg";
import KakaoIcon from "@icon/ic_kakao.svg";
import Image from "next/image";

function SimpleSignin() {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1px] border-solid border-primary-gray-300">
        <Image src={GoogleIcon} alt="간편 로그인 구글" className="cursor-pointer" />
      </div>

      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[1px] border-solid border-primary-gray-300">
        <Image src={KakaoIcon} alt="간편 로그인 카카오" className="cursor-pointer" />
      </div>
    </div>
  );
}

export default SimpleSignin;
