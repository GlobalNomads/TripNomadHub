import { FC } from "react";

interface Schedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
}

interface SelectBoxReservationsListProps {
  schedules: Schedule[];
  onSelectChange: (scheduleId: number) => void; // 선택된 스케줄 ID를 상위로 전달하는 함수
}

const SelectBoxReservationsList: FC<SelectBoxReservationsListProps> = ({ schedules, onSelectChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSchedule = schedules.find(
      schedule => `${schedule.startTime}~${schedule.endTime}` === event.target.value,
    );
    if (selectedSchedule) {
      onSelectChange(selectedSchedule.scheduleId); // 선택된 스케줄 ID를 상위로 전달
    }
  };

  return (
    <div className="relative">
      <select
        onChange={handleSelectChange}
        className="box-border h-[56px] w-full max-w-[790px] rounded-md border border-primary-gray-700 px-4 py-3 text-lg-regular text-primary-black-200"
      >
        {schedules.map(schedule => (
          <option key={schedule.scheduleId} value={`${schedule.startTime}~${schedule.endTime}`} className="h-14">
            {schedule.startTime}~{schedule.endTime}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBoxReservationsList;
