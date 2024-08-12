import HeaderLogo from "@icon/ic_logo_md.svg";
import Image from "next/image";
import Link from "next/link";
import HeaderForm from "./HeaderForm";

function Header({ loginStatus }: { loginStatus: boolean }) {
  return (
    <header className="sticky top-0 z-50 flex justify-center gap-x-[40px] border-b-[1px] border-solid border-primary-gray-300 bg-white p-[20px]">
      <div className="flex w-full max-w-[1200px] justify-between">
        <Link href="/">
          <Image src={HeaderLogo} alt="헤더 로고 이미지" priority />
        </Link>
        <HeaderForm loginStatus={loginStatus} />
      </div>
    </header>
  );
}

export default Header;
