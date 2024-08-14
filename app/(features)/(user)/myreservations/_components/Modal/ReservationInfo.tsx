"use client";
import { ActivityData, ReservationsList } from "@/types/myReservations.type";
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

  return (
    <div key={reservation?.id} className="flex h-[100px] w-full">
      <div className="relative h-[100px] w-[100px] overflow-hidden rounded-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]">
        {activity && <Image src={activity.bannerImageUrl} priority layout="fill" objectFit="cover" alt="배너 이미지" />}
      </div>
      <div>
        <div className="block xl:hidden">{truncateTitle(activity?.title || "", 15)}</div>
        <div className="hidden xl:block">{activity?.title}</div>
        <div className="md:text-sm-regular text-xs-regular xl:text-[18px]">
          {formatDate(reservation.date)} · {reservation.startTime} - {reservation.endTime} · {reservation.headCount}명
        </div>
        <div className="text-2lg-medium md:text-xl-medium xl:text-2xl-medium">₩{reservation.totalPrice}</div>
      </div>
    </div>
  );
};

export default ReservationInfo;
