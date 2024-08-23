"use client";

import { ReservationsList } from "@/types/myReservations.type";
import Rectangle from "@icon/Rectangle 4.svg";
import Image from "next/image";

interface ReservationInfoProps {
  reservation: ReservationsList | null;
}

function ReservationInfo({ reservation }: ReservationInfoProps) {
  if (!reservation) return null;
  const { activity } = reservation;

  // 타이틀 생략 변환
  const truncateTitle = (title: string, maxLength: number) =>
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  // 날짜 변환
  const formatDate = (dateString: string) => dateString.replace(/-/g, ". ");

  // 가격 변환
  const formatPrice = (price: number) => `₩ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  return (
    <div key={reservation?.id} className="mb-[12px] flex w-full gap-2 md:gap-6 xl:h-[100px]">
      <div className="overflow relative h-[85px] w-[85px] md:h-[126px] md:w-[126px]">
        {activity && (
          <Image
            src={activity.bannerImageUrl}
            priority
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            style={{ objectFit: "cover" }}
            alt="배너 이미지"
            className="rounded-3xl"
          />
        )}
      </div>
      <div>
        <div className="mb-[6px] block text-lg-bold md:mb-[12px] md:text-xl-bold">
          {truncateTitle(activity?.title || "", 16)}
        </div>
        <div className="mb-[6px] text-sm font-normal md:text-2lg-regular">
          {formatDate(reservation.date)} · {reservation.startTime} - {reservation.endTime} · {reservation.headCount}명
        </div>
        <div className="mb-[6px] w-[235px] md:mb-[12px] md:w-[282px]">
          <Image src={Rectangle} layout="responsive" width={235} alt="경계선" />
        </div>

        <div className="text-xl-bold md:text-3xl-bold">{formatPrice(reservation.totalPrice)}</div>
      </div>
    </div>
  );
}

export default ReservationInfo;
