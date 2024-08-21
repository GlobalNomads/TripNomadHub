/*
 * 체험 등록 & 수정 - 체험 스케줄 등록 폼
 */

"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import minusIcon from "@/assets/icon/ic_btn_minus_time.svg";
import plusIcon from "@/assets/icon/ic_btn_plus_time.svg";
import calendarIcon from "@/assets/icon/ic_calendar_check_outline.svg";

// 시간 옵션 생성 함수
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

// Schedule 타입 정의
interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

// ScheduleForm 컴포넌트의 프롭 타입 정의
interface ScheduleFormProps {
  schedules: Schedule[];
  onSchedulesChange: (schedules: Schedule[]) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({ schedules, onSchedulesChange }) => {
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 새로운 스케줄을 추가하는 함수
  const addSchedule = () => {
    if (newSchedule.date && newSchedule.startTime && newSchedule.endTime) {
      // 종료 시간이 시작 시간보다 빠르거나 같은지 확인
      if (newSchedule.startTime >= newSchedule.endTime) {
        alert("종료 시간은 시작 시간보다 늦어야 합니다.");
        return;
      }

      // 스케줄 목록에 새 스케줄 추가
      onSchedulesChange([...schedules, newSchedule]);

      // 입력 필드를 초기화
      setNewSchedule({ date: "", startTime: "", endTime: "" });
      setSelectedDate(null);
    }
  };

  // 스케줄을 삭제하는 함수
  const removeSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    onSchedulesChange(newSchedules);
  };

  // 날짜 변경을 처리하는 함수
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd"); // 날짜 형식을 "yyyy-MM-dd"로 변경
      setNewSchedule({ ...newSchedule, date: formattedDate });
    }
    setShowDatePicker(false);
  };

  // 입력 필드의 변경을 처리하는 함수
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
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 pl-6"
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
            className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
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

          <div className="flex h-[56px] items-center justify-center text-xl">~</div>

          <select
            id="new-endTime"
            name="endTime"
            value={newSchedule.endTime}
            onChange={handleChange}
            className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
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
            className="h-[56px] flex-1 rounded border border-gray-700 px-3 py-2"
            style={{ boxSizing: "border-box" }}
          />

          <div className="flex flex-1 items-center space-x-2">
            <input
              type="text"
              value={schedule.startTime}
              readOnly
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
              style={{ boxSizing: "border-box" }}
            />
            <div className="flex h-[56px] items-center justify-center text-xl font-semibold">~</div>
            <input
              type="text"
              value={schedule.endTime}
              readOnly
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
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
