import MainLogo from "@/app/assets/icon/ic_logo_big.svg";
import Image from "next/image";
import Link from "next/link";
//import SignupForm from "./_components/signupForm"; 폼 적용 경로

function Signup() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-60px)] w-full max-w-[440px] items-center justify-center px-5 py-5 xl:min-h-[calc(100dvh-80px)]">
      <div>
        <div className="flex w-[270px] items-center justify-center md:w-[340px]">
          <Image src={MainLogo} alt="메인 로고" className="w-full" />
        </div>
        {/* <SignupForm /> 제출 폼 컴포넌트 완성후 적용 예정 */}

        <div className="mt-[40px] flex items-center justify-center gap-[10px] text-lg-regular">
          회원이 아니신가요?&nbsp;
          <Link href="/signin" className="text-center text-primary-green-300 underline">
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
