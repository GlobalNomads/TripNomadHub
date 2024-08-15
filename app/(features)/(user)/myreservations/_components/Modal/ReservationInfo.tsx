"use client";
import { ActivityData, ReservationsList } from "@/types/myReservations.type";
import Rectangle from "@icon/Rectangle 4.svg";
import Image from "next/image";

interface ReservationInfoProps {
  reservation: ReservationsList | null; // Expect the reservation object
}

const ReservationInfo = ({ reservation }: ReservationInfoProps) => {
  if (!reservation) return null; // Handle case where no reservation is passed

  const activity: ActivityData | undefined = reservation.activity; // Explicitly type activity

  //타이틀 생략 변환
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  //날짜 변환
  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, ". ");
  };

  // 가격 변환
  const formatPrice = (price: number) => {
    return `₩ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div key={reservation?.id} className="mb-[12px] flex w-full gap-2 md:mb-[24px] md:gap-6 xl:h-[100px]">
      <div className="relative h-[100px] w-[100px] overflow-hidden rounded-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]">
        {activity && <Image src={activity.bannerImageUrl} priority layout="fill" objectFit="cover" alt="배너 이미지" />}
      </div>
      <div>
        <div className="mb-[6px] block text-lg-bold xl:hidden">{truncateTitle(activity?.title || "", 15)}</div>
        <div className="mb-[6px] hidden text-lg-bold xl:block">{activity?.title}</div>
        <div className="md:text-sm-regular mb-[6px] text-sm font-normal xl:text-[18px]">
          {formatDate(reservation.date)} · {reservation.startTime} - {reservation.endTime} · {reservation.headCount}명
        </div>
        <div className="mb-[6px]">
          <Image src={Rectangle} width={235} alt="경계선" />
        </div>

        <div className="text-xl-bold md:text-xl-medium xl:text-2xl-medium">{formatPrice(reservation.totalPrice)}</div>
      </div>
    </div>
  );
};

export default ReservationInfo;
