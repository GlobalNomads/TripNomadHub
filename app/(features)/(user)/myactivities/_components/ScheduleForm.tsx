import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import calendarIcon from "@/assets/icon/ic_calendar_check_outline.svg";
import plusIcon from "@/assets/icon/ic_btn_plus_time.svg";
import minusIcon from "@/assets/icon/ic_btn_minus_time.svg";
import { format } from "date-fns";

const generateTimeOptions = (): string[] => {
  const times: string[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    for (let j = 0; j < 60; j += 60) {
      const minute = j.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

const ScheduleForm: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addSchedule = () => {
    if (newSchedule.date && newSchedule.startTime && newSchedule.endTime) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule({ date: "", startTime: "", endTime: "" });
      setSelectedDate(null);
    }
  };

  const removeSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "yy/MM/dd");
      setNewSchedule({ ...newSchedule, date: formattedDate });
    }
    setShowDatePicker(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  return (
    <div className="relative flex w-full max-w-[1200px] flex-col items-start p-0">
      <h2 className="mb-[24px] text-[24px] font-semibold">예약 가능한 시간대</h2>

      <div className="mb-4 flex w-full">
        <div className="flex w-full max-w-[34.5%] justify-start">
          <label htmlFor="new-date" className="text-lg">
            날짜
          </label>
        </div>
        <div className="flex w-full max-w-[33.33%] justify-center">
          <label htmlFor="new-startTime" className="text-lg">
            시작 시간
          </label>
        </div>
        <div className="flex w-full max-w-[12.5%] justify-end">
          <label htmlFor="new-endTime" className="text-lg">
            종료 시간
          </label>
        </div>
      </div>

      <div className="mb-4 flex w-full items-center space-x-4">
        <div className="relative flex flex-1 flex-col">
          <div className="relative flex items-center">
            <input
              type="text"
              id="new-date"
              name="date"
              value={newSchedule.date}
              onChange={handleChange}
              placeholder="YY/MM/DD"
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 sm:pl-3"
              readOnly
              style={{ boxSizing: "border-box" }}
            />
            <button
              type="button"
              onClick={() => setShowDatePicker(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform"
            >
              <Image src={calendarIcon} alt="달력 아이콘" width={32} height={32} />
            </button>
            {showDatePicker && (
              <div className="absolute top-full z-50 mt-2">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yy/MM/dd"
                  minDate={new Date()}
                  locale={ko}
                  inline
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center space-x-2">
          <select
            id="new-startTime"
            name="startTime"
            value={newSchedule.startTime}
            onChange={handleChange}
            className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 sm:pl-3"
            style={{ boxSizing: "border-box" }}
          >
            <option value="" disabled>
              00:00
            </option>
            {timeOptions.map((time, idx) => (
              <option key={idx} value={time}>
                {time}
              </option>
            ))}
          </select>

          <div className="hidden h-[56px] items-center justify-center text-xl sm:flex">~</div>

          <select
            id="new-endTime"
            name="endTime"
            value={newSchedule.endTime}
            onChange={handleChange}
            className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 sm:pl-3"
            style={{ boxSizing: "border-box" }}
          >
            <option value="" disabled>
              00:00
            </option>
            {timeOptions.map((time, idx) => (
              <option key={idx} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={addSchedule}
          className="relative flex h-[56px] w-[56px] items-center justify-center rounded"
        >
          <Image src={plusIcon} alt="추가 아이콘" width={56} height={56} />
        </button>
      </div>

      <div className="my-4 h-[1px] w-full bg-primary-gray-300"></div>

      {schedules.map((schedule, index) => (
        <div key={index} className="mb-4 flex w-full items-center space-x-4">
          <input
            type="text"
            value={schedule.date}
            readOnly
            className="h-[56px] flex-1 rounded border border-gray-700 px-3 py-2 sm:pl-3"
            style={{ boxSizing: "border-box" }}
          />

          <div className="flex flex-1 items-center space-x-2">
            <input
              type="text"
              value={schedule.startTime}
              readOnly
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 sm:pl-3"
              style={{ boxSizing: "border-box" }}
            />
            <div className="hidden h-[56px] items-center justify-center text-xl font-semibold sm:flex">~</div>
            <input
              type="text"
              value={schedule.endTime}
              readOnly
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 sm:pl-3"
              style={{ boxSizing: "border-box" }}
            />
          </div>

          <button
            type="button"
            onClick={() => removeSchedule(index)}
            className="relative flex h-[56px] w-[56px] items-center justify-center rounded"
          >
            <Image src={minusIcon} alt="삭제 아이콘" width={56} height={56} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ScheduleForm;
