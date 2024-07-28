import MainLogo from "@/app/assets/icon/ic_logo_big.svg";
import Image from "next/image";
import Link from "next/link";
import SigninForm from "./_components/SigninForm";

function Signin() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-60px)] w-full max-w-[440px] items-center justify-center px-5 py-5 xl:min-h-[calc(100dvh-80px)]">
      <div>
        <div className="flex w-[270px] items-center justify-center md:w-[340px]">
          <Image src={MainLogo} alt="메인 로고" className="w-full" />
        </div>
        <SigninForm />

        <div className="mt-[40px] flex items-center justify-center gap-[10px] text-lg-regular">
          회원이 아니신가요?&nbsp;
          <Link href="/signup" className="text-center text-primary-green-300 underline">
            회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
