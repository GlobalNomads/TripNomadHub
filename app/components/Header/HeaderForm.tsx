import Link from "next/link";

function HeaderForm() {
  return (
    <div className="flex items-center gap-[25px]">
      <Link href="/signin" className="text-md-medium text-primary-black-200">
        로그인
      </Link>
      <Link href="/signup" className="text-md-medium text-primary-black-200">
        회원가입
      </Link>
    </div>
  );
}

export default HeaderForm;
