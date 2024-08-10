import Image from "next/image";
import Link from "next/link";
import miniStar from "@icon/mini_star.svg";
import { useState } from "react";
import type { ActivityList } from "@/types/activities.type";

const Activity = ({ data }: { data: ActivityList }) => {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  // bannerImageUrl이 null일 경우 대체 이미지 사용
  const [imageSrc, setImageSrc] = useState(bannerImageUrl || "/assets/image/empty.svg");

  const handleImageError = () => {
    setImageSrc("/assets/image/empty.svg");
  };

  return (
    <Link href={`/activity/${id}`} className="group w-full">
      <div className="relative aspect-square w-full">
        <Image
          src={imageSrc}
          fill
          alt="banner"
          priority
          onError={handleImageError}
          className="rounded-2xl object-cover shadow-none transition-all duration-300 group-hover:translate-y-[-3px] group-hover:shadow-lg group-hover:shadow-primary-gray-300"
        />
      </div>

      <div className="my-4 flex items-center gap-5 text-md-semibold md:my-8 md:text-lg-semibold">
        <Image src={miniStar} alt="Star" width={16} height={16} />
        <span>
          {rating} <span className="text-primary-gray-450">({reviewCount})</span>
        </span>
      </div>
      <h1 className="line-clamp-2 text-2lg-semibold text-primary-black-200 md:text-2xl-semibold">{title}</h1>
      <div className="mb-4 mt-12">
        <span className="text-2xl-bold">₩ {price.toLocaleString()} </span>
        <span className="text-primary-gray-450">/ 인</span>
      </div>
    </Link>
  );
};

export default Activity;
