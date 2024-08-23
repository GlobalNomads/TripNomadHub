"use client";
import patchMyReservations from "@/api/MyReservations/patchMyReservations";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { ReservationsData, ReservationsList } from "@/types/myReservations.type";
import getMyReservations from "@api/MyReservations/getMyReservations";
import Button from "@button/Button";
import Modal from "@modal/Modal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useState } from "react";
import ReservationInfo from "./Modal/ReservationInfo";
import { getStatusColor, getStatusText } from "./StatusUtils";

type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

interface ReservationCardProps {
  selectedStatus: ReservationStatus | undefined;
}

const ReservationCard: FC<ReservationCardProps> = ({ selectedStatus }) => {
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationsList | null>(null);

  const statusToUse = selectedStatus || undefined;

  const { data, error, isLoading } = useQuery<ReservationsData>({
    queryKey: ["reservations", statusToUse],
    queryFn: () => getMyReservations({ size: 20, status: statusToUse }),
    staleTime: 60000,
    retry: 2,
  });

  const queryClient = useQueryClient();

  const handleCancelReservation = async () => {
    if (selectedReservation) {
      try {
        await patchMyReservations(selectedReservation.id);
        const queryKey = { queryKey: ["reservations", statusToUse] };

        queryClient.invalidateQueries(queryKey);
        setCancelModalOpen(false);
      } catch (error) {
        console.error("Failed to cancel reservation:", error);
        alert(error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  if (!data || data.reservations.length === 0) {
    return <EmptyPage />;
  }

  // 타이틀 생략 변환
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  // 날짜 변환
  const formatDate = (dateString: string) => {
    return dateString.replace(/-/g, ". ");
  };

  return (
    <div className="mx-auto flex flex-col gap-2 md:gap-4 xl:gap-6">
      {data.reservations.map(reservation => {
        // 가격 변환
        const formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "KRW",
        }).format(reservation.totalPrice);

        return (
          <div
            key={reservation.id}
            className="flex h-[128px] rounded-3xl border border-solid border-gray-300 bg-white md:h-[156px] md:w-[429px] xl:h-[204px] xl:w-[792px]"
          >
            <div className="relative h-[128px] w-[128px] flex-shrink-0 overflow-hidden rounded-l-3xl md:h-[156px] md:w-[156px] xl:h-[204px] xl:w-[204px]">
              {reservation.activity && (
                <Image
                  src={reservation.activity.bannerImageUrl}
                  priority
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 156px, 204px"
                  style={{ objectFit: "cover" }}
                  alt="배너 이미지"
                />
              )}
            </div>
            <div className="ml-2 mr-3 mt-[11px] grid w-full md:ml-3 md:mt-[12px] xl:ml-6 xl:mt-[21px] xl:h-[162px]">
              <div className="grid gap-1 md:gap-[0px] xl:gap-[12px]">
                <div className={`text-sm font-bold md:text-lg ${getStatusColor[reservation.status]}`}>
                  {getStatusText[reservation.status]}
                </div>
                <div className="text-md-bold md:text-lg-bold xl:text-xl-bold">
                  {reservation.activity ? (
                    <>
                      <span className="block xl:hidden">{truncateTitle(reservation.activity.title, 15)}</span>
                      <span className="hidden xl:block">{reservation.activity.title}</span>
                    </>
                  ) : (
                    <span>Activity title not available</span>
                  )}
                </div>
                <div className="md:text-sm-regular text-xs-regular xl:text-[18px]">
                  {formatDate(reservation.date)} · {reservation.startTime} - {reservation.endTime} ·{" "}
                  {reservation.headCount}명
                </div>
              </div>
              <div className="mb-1 flex w-full items-center justify-between md:w-[245px] xl:mb-0 xl:mt-4 xl:w-[540px]">
                <div className="text-2lg-medium md:text-xl-medium xl:text-2xl-medium">{formattedPrice}</div>
                {reservation.status === "completed" && reservation.reviewSubmitted === false && (
                  <div className="">
                    <Button.WriteReview
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setReviewModalOpen(true);
                      }}
                    />
                    <Modal.Review
                      isOpen={isReviewModalOpen}
                      onClose={() => setReviewModalOpen(false)}
                      reservation={selectedReservation}
                      onSuccess={() => {
                        /* 성공 시 처리할 로직 */
                      }}
                    >
                      <>
                        <ReservationInfo reservation={selectedReservation} /> {/* Pass a single reservation object */}
                      </>{" "}
                      {/* 빈 React Fragment를 children으로 전달 */}
                    </Modal.Review>
                  </div>
                )}
                {reservation.status === "pending" && (
                  <div className="">
                    <Button.CancelReservation
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setCancelModalOpen(true);
                      }}
                    />
                    <Modal.Cancel
                      isOpen={isCancelModalOpen}
                      onClose={() => setCancelModalOpen(false)}
                      onCancel={handleCancelReservation}
                      description="예약을 취소하시겠어요?"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReservationCard;
