import Button from "@button/Button";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

interface Reservation {
  id: number;
  nickname: string;
  headCount: number;
  status: "pending" | "confirmed" | "declined";
}

interface ReservationListProps {
  reservations: Reservation[];
}

interface ReservationListCardProps extends Reservation {
  onApprove: () => void;
  onDecline: () => void;
}

const mapStatusToUnionType = (status: string): "pending" | "confirmed" | "declined" => {
  if (status === "pending" || status === "confirmed" || status === "declined") {
    return status;
  }
  throw new Error(`Unexpected status: ${status}`);
};

const ReservationList: FC<ReservationListProps> = ({ reservations }) => {
  const queryClient = useQueryClient();

  {
    /*TODO: 작동하는지 확인해주세요 ㅠㅠ*/
  }

  // const { mutate } = useMutation({
  //   mutationFn: (reservationId: number) => patchMyReservations(reservationId),
  //   onSuccess: () => {
  //     // 관련 쿼리를 무효화하여 데이터가 다시 로드되도록 함
  //     queryClient.invalidateQueries({ queryKey: ["reservations"] });
  //   },
  //   onError: (error: Error) => {
  //     console.error("예약 상태 업데이트 실패:", error.message);
  //   },
  // });

  return (
    <div className="overflow-y-auto md:h-[300px]">
      {reservations.map(reservation => (
        <ReservationListCard
          key={reservation.id}
          id={reservation.id}
          status={mapStatusToUnionType(reservation.status)}
          nickname={reservation.nickname}
          headCount={reservation.headCount}
          onApprove={() => mutate(reservation.id)}
          onDecline={() => mutate(reservation.id)}
        />
      ))}
    </div>
  );
};

const ReservationListCard: FC<ReservationListCardProps> = ({ status, nickname, headCount, onApprove, onDecline }) => {
  const mappedStatus = mapStatusToUnionType(status);
  return (
    <div className="space-y-2 rounded-lg border border-solid border-primary-gray-300 p-4">
      <div className="space-x-3 text-[16px]">
        <span className="font-bold text-primary-gray-700">닉네임</span>
        <span className="font-semibold text-primary-black-200">{nickname}</span>
      </div>
      <div className="space-x-3 text-[16px]">
        <span className="font-bold text-primary-gray-700">인원</span>
        <span className="font-semibold text-primary-black-200">{headCount}명</span>
      </div>

      {mappedStatus === "pending" ? (
        <div className="flex justify-end space-x-2">
          <Button type="nomadBlack" className="h-[38px] w-[82px]" onClick={onApprove}>
            승인하기
          </Button>
          <Button type="white" className="h-[38px] w-[82px]" onClick={onDecline}>
            거절하기
          </Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            className={`rounded-3xl px-[15px] py-2 text-lg-bold ${
              status === "confirmed"
                ? "bg-primary-orange-100 text-primary-orange-200"
                : "bg-primary-red-100 text-primary-red-200"
            }`}
            disabled
          >
            {mappedStatus === "confirmed" ? "예약 승인됨" : "예약 거절됨"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationList;
