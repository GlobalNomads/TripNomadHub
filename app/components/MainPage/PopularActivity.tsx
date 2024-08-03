import Image from "next/image";
import Link from "next/link";

import miniStar from "@/assets/icon/mini_star.svg";

import type { Activites } from "./types";

const PopularActivity = ({ data }: { data: Activites }) => {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  return (
    <Link
      href={`/activity/${id}`}
      className="relative size-[186px] flex-shrink-0 rounded-[20px] px-[20px] pb-[24px] text-white shadow-none transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-primary-gray-300 md:size-[384px]"
    >
      <Image src={bannerImageUrl} alt="banner" fill className="absolute -z-10 rounded-[20px] brightness-75 filter" />

      <div className="mt-[48px] flex items-center gap-5 text-md-semibold leading-[24px] md:mt-[174px]">
        <Image src={miniStar} alt="Star" width={16} height={16} />
        <span>
          {rating} ({reviewCount})
        </span>
      </div>
      <h1 className="mt-6 line-clamp-2 text-2xl-bold leading-[26px] md:mt-[20px] md:text-3xl-bold md:leading-[42px]">
        {title}
      </h1>
      <div className="absolute bottom-[24px] md:bottom-[30px]">
        <span className="font-bold leading-[26px]">₩ {price.toLocaleString()} </span>
        <span className="text-lg-medium leading-[24px] text-primary-gray-450">/ 인</span>
      </div>
    </Link>
  );
};

export default PopularActivity;
