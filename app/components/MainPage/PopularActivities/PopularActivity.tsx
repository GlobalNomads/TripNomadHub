import useImageLoad from "@/hooks/useImageLoad";
import miniStar from "@icon/mini_star.svg";
import EmptyImage from "@image/empty.svg";
import Image from "next/image";
import Link from "next/link";
import type { ActivityList } from "@/types/activities.type";

const PopularActivity = ({ data }: { data: ActivityList }) => {
  const { id, title, price, rating, reviewCount, bannerImageUrl } = data;
  const imageError = useImageLoad(bannerImageUrl);
  const displayImage = imageError ? EmptyImage : bannerImageUrl;

  return (
    <Link
      href={`/activity/${id}`}
      className="relative flex h-[350px] w-full flex-shrink-0 flex-col overflow-hidden rounded-lg border border-primary-gray-300 shadow-md transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg md:w-[275px]"
    >
      <div className="relative h-[165px] w-full overflow-hidden">
        <Image
          src={displayImage || EmptyImage}
          alt="banner"
          fill
          sizes="275px"
          className="absolute inset-0 object-cover"
        />
      </div>
      <div className="flex flex-grow flex-col justify-between bg-white p-4 text-black">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <Image src={miniStar} alt="Star" width={16} height={16} />
            <span>
              {rating} ({reviewCount})
            </span>
          </div>
          <h2 className="mb-2 line-clamp-2 text-lg font-bold">{title}</h2>
        </div>
        <div>
          <span className="text-lg font-bold">₩ {price.toLocaleString()} </span>
          <span className="text-sm text-primary-gray-450">/ 인</span>
        </div>
      </div>
    </Link>
  );
};

export default PopularActivity;
