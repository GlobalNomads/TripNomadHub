import ResScheduleForm from "./_components/ResScheduleForm";

function ReservationSchedule() {
  return (
    <div className="grid gap-8">
      <div className="text-3xl-bold">예약 현황</div>
      <ResScheduleForm />
    </div>
  );
}

export default ReservationSchedule;
