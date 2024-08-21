import useImageLoad from "@/hooks/useImageLoad";
import miniStar from "@icon/mini_star.svg";
import EmptyImage from "@image/empty.svg";
import Image from "next/image";
import Link from "next/link";

import type { ActivityList } from "@/types/activities.type";
import SkeletonBox from "@skeleton/SkeletonBox";

const PopularActivity = ({ data }: { data: ActivityList }) => {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;

  // useImageLoad 훅을 사용하여 이미지 로드 상태를 확인
  const { loading, imgError } = useImageLoad(bannerImageUrl);

  // 이미지 로딩 중이거나 에러가 있을 경우 대체 이미지를 사용
  const displayImage = imgError || !bannerImageUrl ? EmptyImage : bannerImageUrl;

  return (
    <Link
      href={`/activity/${id}`}
      className="relative size-[186px] flex-shrink-0 rounded-[20px] px-[20px] pb-[24px] text-white shadow-none transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg hover:shadow-primary-gray-300 md:size-[384px]"
    >
      {/* 이미지 로딩 중일 때 Skeleton 표시 */}
      {loading ? (
        <SkeletonBox width="100%" height="100%" className="absolute -z-10 rounded-[20px]" />
      ) : (
        <Image
          src={displayImage}
          alt="체험 banner 이미지"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute -z-10 rounded-[20px] object-cover brightness-75 filter"
        />
      )}

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
