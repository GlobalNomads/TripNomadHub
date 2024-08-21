import useImageLoad from "@/hooks/useImageLoad";
import miniStar from "@icon/mini_star.svg";
import EmptyImage from "@image/empty.svg";
import SkeletonBox from "@skeleton/SkeletonBox";
import Image from "next/image";
import Link from "next/link";

import type { ActivityList } from "@/types/activities.type";

const Activity = ({ data }: { data: ActivityList }) => {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  // useImageLoad 훅을 사용하여 이미지 로드 상태를 확인.
  const { loading, imgError } = useImageLoad(bannerImageUrl);

  // 이미지 오류가 있을 경우 대체 이미지를 사용하도록 설정.
  const displayImage = imgError ? EmptyImage : bannerImageUrl;

  return (
    <Link href={`/activity/${id}`} className="group w-full">
      <div className="relative aspect-square w-full">
        {/* 이미지 로딩 중이면 SkeletonBox를 표시 */}
        {loading ? (
          <SkeletonBox className="rounded-2xl" width="100%" height="100%" />
        ) : (
          <Image
            src={displayImage || EmptyImage}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="체험 banner 이미지"
            priority
            className="rounded-2xl object-cover shadow-none transition-all duration-300 group-hover:translate-y-[-3px] group-hover:shadow-lg group-hover:shadow-primary-gray-300"
          />
        )}
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
