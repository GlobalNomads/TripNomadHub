import patchMyReservations from "@/api/MyReservations/patchMyReservations";
import { ReservationsList } from "@/types/myReservations.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useCancelReservation = (
  setCurrentReservations: React.Dispatch<React.SetStateAction<ReservationsList[]>>,
) => {
  const queryClient = useQueryClient();
  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationsList | null>(null);

  const { mutate: CancelReservation } = useMutation({
    mutationFn: () => patchMyReservations(selectedReservation?.id!),
    onSuccess: () => {
      setCurrentReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === selectedReservation?.id ? { ...reservation, status: "canceled" } : reservation,
        ),
      );
      queryClient.invalidateQueries({
        queryKey: ["reservations"],
      });
      setCancelModalOpen(false);
    },
    onError: error => {
      console.error("Failed to cancel reservation:", error);
      alert("Failed to cancel reservation");
    },
  });

  const handleCancelReservation = (reservation: ReservationsList) => {
    setSelectedReservation(reservation);
    setCancelModalOpen(true);
  };

  return {
    handleCancelReservation,
    isCancelModalOpen,
    setCancelModalOpen,
    selectedReservation,
    CancelReservation,
  };
};
