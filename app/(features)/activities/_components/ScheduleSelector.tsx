/*
    date-picker 이용해서 체험 날짜 & 시간 선택
*/
import Button from "@button/Button";
import { Locale, format } from "date-fns";
import ko from "date-fns/locale/ko";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";

registerLocale("ko", ko as unknown as Locale);

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(""); // 날짜가 변경될 때 선택된 시간을 초기화합니다.
    }
  };

  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
    setSelectedTime(time);
    setSelectedSchedule(`${format(selectedDate!, "yyyy-MM-dd")} ${time}`); // 날짜 형식을 'yyyy-MM-dd'로 맞춤
  };

  const today = new Date();

  // 선택된 날짜에 따라 예약 가능한 시간을 필터링합니다.
  const filteredSchedules = schedules.filter(schedule =>
    selectedDate ? schedule.date === format(selectedDate, "yyyy-MM-dd") : false,
  );

  // 예약 가능한 날짜만 활성화
  const isDateSelectable = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return schedules.some(schedule => schedule.date === dateString);
  };

  // 예약 가능한 날짜와 불가능한 날짜의 스타일을 다르게 적용
  const dayClassName = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return schedules.some(schedule => schedule.date === dateString) ? "selectable-day" : "non-selectable-day";
  };

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
            locale="ko"
            className="input react-datepicker-custom"
            inline
            filterDate={isDateSelectable}
            dayClassName={dayClassName}
          />
        </div>
      </div>
      <div>
        <h3 className="pb-3 text-xl-bold text-primary-black-100">예약 가능한 시간</h3>
        <div className="space-x-3 space-y-3 text-center">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((schedule, index) => (
              <Button.Default
                key={`${schedule.id}-${index}`}
                type={selectedTime === `${schedule.startTime}~${schedule.endTime}` ? "nomadBlack" : "white"}
                onClick={() => {
                  console.log(`Button clicked for ${schedule.startTime}~${schedule.endTime}`);
                  handleTimeSelect(`${schedule.startTime}~${schedule.endTime}`);
                }}
                className={`w-[120px] rounded-[8px] px-3 py-2 text-lg-semibold`}
              >
                {schedule.startTime}~{schedule.endTime}
              </Button.Default>
            ))
          ) : (
            <p>선택된 날짜에 예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleSelector;
