"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { fetchMyReservations } from "./api";

interface Reservation {
  activity: {
    title: string;
    bannerImageUrl: string;
  };
}

interface MyReservationsResponse {
  reservations: Reservation[];
}

const ReservationCard = () => {
  const { data, error, isLoading } = useQuery<MyReservationsResponse>({
    queryKey: ["reservations"],
    queryFn: fetchMyReservations,
    staleTime: 60000, // 1 minute (60000 milliseconds)
    retry: 2, // Retry twice on failure
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data || data.reservations.length === 0) {
    return <div>No reservations found</div>;
  }

  const title = data.reservations[0].activity.title;
  const bannerImageUrl = data.reservations[0].activity.bannerImageUrl;

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
        <div className="text-md-bold">{title}</div>
      </div>
    </div>
  );
};

export default ReservationCard;
