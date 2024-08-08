"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchMyReservations, MyReservationsResponse } from "./api";

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
    return <div>No reservations found</div>;
  }
  const reservation = data.reservations[0];
  const { title, bannerImageUrl } = reservation.activity;
  const { date, startTime, endTime, totalPrice, status, headCount } = reservation;

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "예약 완료";
      case "canceled":
        return "예약 취소";
      case "declined":
        return "예약 거절";
      case "completed":
        return "체험 완료";
      case "confirmed":
        return "예약 승인";
      default:
        return status;
    }
  };

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, ".");
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
        <div className="ml-2 mt-[11px] md:mt-[12px] xl:mt-[21px]">
          <div className="grid gap-1 md:gap-[5px] xl:gap-[12px]">
            <div className="text-sm md:text-[16px]">{getStatusText(status)}</div>
            <div className="text-md-bold md:text-lg-bold xl:text-xl-bold">
              <span className="block xl:hidden">{truncateTitle(title, 15)}</span>
              <span className="hidden xl:block">{title}</span>
            </div>
            <div className="md:text-sm-regular text-xs-regular xl:text-[18px]">
              {formatDate(date)} · {startTime}-{endTime} · {headCount}명
            </div>
          </div>

          <div>
            <div className="text-2lg-medium md:text-xl-medium xl:text-2xl-medium">₩{totalPrice}</div>
            <div className="btn_mobile_black md:btn_tablet_black xl:btn_desktop_black">후기 작성</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
