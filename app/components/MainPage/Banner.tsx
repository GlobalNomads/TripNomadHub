import dancer from "@image/dancer.png";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-96 w-full">
      <Image src={dancer} alt="Street Dance" fill={true} objectFit="cover" quality={100} />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="main-layout absolute inset-0 flex flex-col items-start justify-center pl-10 text-white">
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          함께 배우면 즐거운 <br /> 스트릿 댄스
        </h1>
        <p className="mt-4 text-lg md:text-2xl">1월의 인기 체험 BEST 🔥</p>
      </div>
      <div className="absolute bottom-20 left-1/2 w-full max-w-screen-lg -translate-x-1/2 transform px-4"></div>
    </div>
  );
};

export default Banner;
