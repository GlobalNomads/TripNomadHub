"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchMyReservations, MyReservationsResponse } from "../api/api";
import { getStatusColor, getStatusText } from "./StatusUtils";

const ReservationCard = () => {
  const { data, error, isLoading } = useQuery<MyReservationsResponse>({
    queryKey: ["reservations"],
    queryFn: fetchMyReservations,
    staleTime: 60000,
    retry: 2,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.reservations.length === 0) {
    return <div>아직 등록한 체험이 없어요</div>;
  }
  const reservation = data.reservations[0];
  const { title, bannerImageUrl } = reservation.activity;
  const { date, startTime, endTime, totalPrice, status, headCount } = reservation;

  //타이틀 생략 변환
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  //날짜 변환
  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, ". ");
  };

  return (
    <div className="mx-auto flex-row">
      <div className="mb-3 ml-4 mt-6 text-3xl-bold">예약 내역</div>
      <div className="flex h-[128px] w-[344px] rounded-3xl border border-solid border-gray-300 bg-white md:h-[156px] md:w-[429px] xl:h-[204px] xl:w-[792px]">
        <div>
          <Image
            src={bannerImageUrl}
            width={160}
            height={160}
            alt="배너 이미지"
            className="h-[128px] w-[128px] rounded-l-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]"
          />
        </div>
        <div className="ml-2 mt-[11px] grid md:ml-3 md:mt-[12px] xl:ml-6 xl:mt-[21px] xl:h-[162px]">
          <div className="grid gap-1 md:gap-[0px] xl:gap-[12px]">
            <div className={`text-sm font-bold md:text-lg ${getStatusColor(status)}`}>{getStatusText(status)}</div>
            <div className="text-md-bold md:text-lg-bold xl:text-xl-bold">
              <span className="block xl:hidden">{truncateTitle(title, 15)}</span>
              <span className="hidden xl:block">{title}</span>
            </div>
            <div className="md:text-sm-regular text-xs-regular xl:text-[18px]">
              {formatDate(date)} · {startTime} - {endTime} · {headCount}명
            </div>
          </div>
          <div className="mb-1 flex w-[190px] items-center justify-between md:w-[245px] xl:mb-0 xl:mt-4 xl:w-[540px]">
            <div className="text-2lg-medium md:text-xl-medium xl:text-2xl-medium">₩{totalPrice}</div>
            <div className="btn_mobile_black md:btn_tablet_black xl:btn_desktop_black">후기 작성</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
