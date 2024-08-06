import HeaderLogo from "@icon/ic_logo_md.svg";
import Image from "next/image";
import Link from "next/link";
import HeaderForm from "./HeaderForm";

function Header() {
  return (
    <header className="sticky top-0 z-10 flex justify-center gap-x-[40px] border border-b-[1px] border-primary-gray-300 bg-white p-[20px]">
      <div className="flex w-full max-w-[1200px] justify-between">
        <Link href="/">
          <Image src={HeaderLogo} alt="헤더 로고 이미지" priority />
        </Link>
        <HeaderForm />
      </div>
    </header>
  );
}

export default Header;
