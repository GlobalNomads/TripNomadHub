/*
    date-picker 이용해서 체험 날짜 & 시간 선택
*/
import Button from "@button/Button"; // 상위 경로에 따라 변경해야 할 수 있습니다.
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 필수 스타일
import "./DatePickerStyles.css";

type ButtonType = "white" | "nomadBlack";

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface ScheduleSelectorProps {
  schedules: Schedule[];
  setSelectedSchedule: (schedule: string) => void;
}
const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({ schedules = [], setSelectedSchedule }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // 현재 날짜를 초기 선택 값으로 설정
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [buttonType, setButtonType] = useState<ButtonType>("white"); // 버튼 타입 상태에 타입 지정

  const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
    if (date) {
      // date가 null이 아닐 때만 상태를 업데이트
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setSelectedSchedule(`${selectedDate?.toLocaleDateString()} ${time}`);
  };

  const handleClick = () => {
    // 버튼 타입을 토글합니다.
    setButtonType(currentType => (currentType === "white" ? "nomadBlack" : "white"));
  };

  const today = new Date();

  return (
    <div>
      <div>
        <h3 className="text-xl-bold text-primary-black-100">날짜</h3>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={today}
          dateFormat="yyyy/MM/dd"
          className="input react-datepicker-custom" // Tailwind CSS 클래스를 적용할 수 있습니다.
          inline
        />
      </div>
      <div>
        <h3 className="text-xl-bold text-primary-black-100">예약 가능한 시간</h3>
        {schedules.map(schedule => (
          <Button.Default
            key={schedule.id}
            onClick={() => handleTimeSelect(`${schedule.startTime}~${schedule.endTime}`)}
            className={`w-[120px] rounded-[8px] px-3 py-2 text-lg-semibold ${
              selectedTime === `${schedule.startTime}~${schedule.endTime}` ? "bg-gray-300" : ""
            }`}
          >
            {schedule.startTime}~{schedule.endTime}
          </Button.Default>
        ))}
      </div>
    </div>
  );
};

export default ScheduleSelector;
