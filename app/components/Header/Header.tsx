import HeaderLogo from "@icon/ic_logo_md.svg";
import Image from "next/image";

function Header() {
  return (
    <header className="fixed sticky top-0 z-10 flex justify-center gap-x-[40px] border border-b-[1px] border-primary-gray-300 bg-white p-[20px]">
      <div className="flex w-full max-w-[1200px] justify-between">
        <Image src={HeaderLogo} alt="헤더 로고 이미지"></Image>
        <Image src={HeaderLogo} alt="헤더 로고 이미지"></Image> {/* 임시로 위치 배정을 위해 아이콘을 넣어둠 */}
        {/* <HeaderForm /> 위 이미지 대신 이 부분이 반영될 예정 a*/}
      </div>
    </header>
  );
}

export default Header;
