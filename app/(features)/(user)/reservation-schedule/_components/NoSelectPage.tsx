import empty from "@image/empty.svg";
import Image from "next/image";

const NoSelectPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mb-[300px] mt-[60px] flex w-full flex-col items-center justify-center md:mb-[481px] md:mt-[56px] xl:mb-[349px] xl:mt-[86px]">
          <Image src={empty} className="h-[200px] w-[200px] xl:h-[240px] xl:w-[240px]" alt="빈 페이지" />
          <div className="text-2xl-medium text-primary-gray-700">체험을 선택해주세요.</div>
        </div>
      </div>
    </>
  );
};

export default NoSelectPage;
