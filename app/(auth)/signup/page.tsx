import MainLogo from "@icon/ic_logo_big.svg";
import Image from "next/image";
import Link from "next/link";
import AuthHr from "../_components/AuthHr";
import SignupForm from "../_components/SignupForm";
import SimpleSignup from "../_components/SimpleSignup";

function Signup() {
  return (
    <div className="lg-[104px] mx-auto w-full max-w-[640px] px-3 py-11 md:px-[52px] md:py-[72px]">
      <div className="grid gap-7">
        <div className="flex justify-center">
          <Image src={MainLogo} alt="메인 로고" className="w-[270px] md:w-[340px]" />
        </div>
        <SignupForm />

        <div className="flex items-center justify-center gap-[10px] text-lg-regular">
          회원이신가요?&nbsp;
          <Link href="/signin" className="text-center text-primary-green-300 underline">
            로그인하기
          </Link>
        </div>

        <AuthHr>SNS 계정으로 회원가입하기</AuthHr>
        <SimpleSignup />
      </div>
    </div>
  );
}

export default Signup;
