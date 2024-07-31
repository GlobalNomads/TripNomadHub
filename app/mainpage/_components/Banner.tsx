import Image from 'next/image';
import dancer from '../../assets/image/dancer.png';


const Banner = () => {
  return (
    <div className="relative w-full h-96">
      <Image
        src={dancer}
        alt="Street Dance"
        fill={true}
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-start pl-10 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          함께 배우면 즐거운 <br /> 스트릿 댄스
        </h1>
        <p className="text-lg md:text-2xl mt-4">1월의 인기 체험 BEST 🔥</p>
      </div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg px-4">
      </div>
    </div>
  );
};

export default Banner;
