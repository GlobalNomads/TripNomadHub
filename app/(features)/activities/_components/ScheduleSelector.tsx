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

  const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
    if (date) {
      // date가 null이 아닐 때만 상태를 업데이트
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
    setSelectedTime(time);
    setSelectedSchedule(`${selectedDate?.toLocaleDateString()} ${time}`);
  };

  const today = new Date();

  return (
    <div>
      <div>
        <h3 className="pb-4 text-xl-bold text-primary-black-100">날짜</h3>
        <div className="pb-4 text-center">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={today}
            dateFormat="yyyy/MM/dd"
            className="input react-datepicker-custom"
            inline
          />
        </div>
      </div>
      <div>
        <h3 className="pb-3 text-xl-bold text-primary-black-100">예약 가능한 시간</h3>
        <div className="space-x-3 space-y-3 text-center">
          {schedules.map((schedule, index) => (
            <Button.Default
              key={`${schedule.id}-${index}`}
              type={selectedTime === `${schedule.startTime}~${schedule.endTime}` ? "nomadBlack" : "white"}
              onClick={() => {
                console.log(`Button clicked for ${schedule.startTime}~${schedule.endTime}`); // 디버깅 메시지 추가
                handleTimeSelect(`${schedule.startTime}~${schedule.endTime}`);
              }}
              className={`w-[120px] rounded-[8px] px-3 py-2 text-lg-semibold`}
            >
              {schedule.startTime}~{schedule.endTime}
            </Button.Default>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSelector;
