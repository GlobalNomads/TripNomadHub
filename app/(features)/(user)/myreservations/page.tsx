"use client";
import getMyReservations from "@/api/MyReservations/getMyReservations";
import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { ReservationsData, ReservationsList } from "@/types/myReservations.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import DropdownItems from "./_components/DropdownItems";
import ReservationCard from "./_components/ReservationCard";
import Spinner from "./_components/Spinner";

type ReservationStatus = "pending" | "confirmed" | "declined" | "canceled" | "completed";

const MyReservations: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | undefined>(undefined);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isError, isFetchingNextPage } = useInfiniteQuery<
    ReservationsData,
    Error
  >({
    queryKey: ["getMyReservations", selectedStatus],
    queryFn: async ({ pageParam = 1 }) => {
      return await getMyReservations({ size: 8, cursorId: pageParam as number, status: selectedStatus });
    },
    getNextPageParam: lastPage => lastPage.cursorId ?? undefined,
    initialPageParam: undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <h3>Failed to load</h3>;

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="mb-3 text-3xl-bold">예약 내역</div>
        <div>
          <DropdownItems setSelectedStatus={setSelectedStatus} />
        </div>
      </div>

      {!data || data.pages.every(page => page.reservations.length === 0) ? (
        <EmptyPage />
      ) : (
        <div className="h-full w-full">
          <div className="mx-auto flex flex-col gap-2 md:gap-4 xl:gap-6">
            {data?.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.reservations.map((reservation: ReservationsList, index: React.Key | null | undefined) => (
                  <ReservationCard
                    key={index}
                    reservations={[reservation]}
                    selectedStatus={selectedStatus as ReservationStatus}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>

          <div ref={ref} />
          {isFetchingNextPage && (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
