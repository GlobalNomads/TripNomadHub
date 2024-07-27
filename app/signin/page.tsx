import MainLogo from "@/app/assets/icon/ic_logo_big.svg";
import Image from "next/image";
import Link from "next/link";
//import SigninForm from "./_components/signinForm"; 폼 적용 경로

function Signin() {
  return (
    <div>
      <div>
        <Image src={MainLogo} alt="메인 로고" />

        {/* <SigninForm /> 제출 폼 컴포넌트 완성후 적용 예정 */}

        <div>
          회원이 아니신가요?&nbsp;
          <Link href="/signup">회원가입하기</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
