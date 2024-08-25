import useImageLoad from "@/hooks/useImageLoad";
import miniStar from "@icon/mini_star.svg";
import EmptyImage from "@image/empty.svg";
import Image from "next/image";
import Link from "next/link";

import type { ActivityList } from "@/types/activities.type";

const PopularActivity = ({ data }: { data: ActivityList }) => {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  // useImageLoad 훅을 사용하여 이미지 로드 상태를 확인.
  const imageError = useImageLoad(bannerImageUrl);

  // 이미지 오류가 있을 경우 대체 이미지를 사용하도록 설정.
  const displayImage = imageError && bannerImageUrl ? EmptyImage : bannerImageUrl;


  return (
    <Link
      href={`/activity/${id}`}
      className="relative size-[186px] flex-shrink-0 rounded-[20px] px-[20px] pb-[24px] text-white shadow-none transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-gray-400 md:w-[384px] md:h-[384px]"
    >
      <Image
        src={displayImage || EmptyImage}
        alt="banner"
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        className="absolute -z-10 rounded-[20px] object-cover brightness-75 filter"
      />

      <div className="mt-[40px] flex items-center gap-1 text-md-semibold leading-[24px] md:mt-[174px] font-semibold leading-24">
        <Image src={miniStar} alt="Star" width={16} height={16} />
        <span>
          {rating} ({reviewCount})
        </span>
      </div>
      <h2 className="mt-6 line-clamp-2 text-xl-bold leading-[26px] md:mt-[20px] md:text-2xl-bold md:leading-[42px]">
        {title}
      </h2>
      <div className="absolute bottom-[24px] md:bottom-[30px]">
        <span className="font-bold leading-[26px]">₩ {price.toLocaleString()} </span>
        <span className="text-lg-medium leading-[24px] text-primary-gray-450">/ 인</span>
      </div>
    </Link>
  );
};

export default PopularActivity;