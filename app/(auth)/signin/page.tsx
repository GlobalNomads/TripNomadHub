import MainLogo from "@icon/ic_logo_big.svg";
import Image from "next/image";
import Link from "next/link";
import AuthHr from "../_components/AuthHr";
import SigninForm from "../_components/SigninForm";
import SimpleSignin from "../_components/SimpleSignin";

function Signin() {
  return (
    <div className="lg-[104px] mx-auto w-full max-w-[640px] px-3 py-11 md:px-[52px] md:py-[72px]">
      <div className="grid gap-7">
        <div className="flex justify-center">
          <Image src={MainLogo} alt="메인 로고" className="w-[270px] md:w-[340px]" />
        </div>
        <SigninForm />

        <div className="flex items-center justify-center gap-[10px] text-lg-regular">
          회원이 아니신가요?&nbsp;
          <Link href="/signup" className="text-center text-primary-green-300 underline">
            회원가입하기
          </Link>
        </div>

        <AuthHr>SNS 계정으로 로그인하기</AuthHr>
        <SimpleSignin />
      </div>
    </div>
  );
}

export default Signin;
