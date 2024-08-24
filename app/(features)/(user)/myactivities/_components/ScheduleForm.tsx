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

const ScheduleForm: React.FC = ({ schedules, onSchedulesChange }) => {
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
      const formattedDate = format(date, "yy/MM/dd"); // 날짜 형식을 "yyyy-MM-dd"로 변경
      setNewSchedule({ ...newSchedule, date: formattedDate });
    }
    setShowDatePicker(false);
  };

  // 입력 필드의 변경을 처리하는 함수
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };
  return (
    <div className="relative flex w-[343px] w-full flex-col items-start p-0 md:w-[429px] xl:w-[792px]">
      <label htmlFor="time" className="mb-2 pt-4 text-[24px] font-semibold">
        예약 가능한 시간대
      </label>

      <div className="mb-4 flex w-full max-w-[343px] md:w-[429px] xl:w-[792px]">
        <div className="flex w-full max-w-[40%] justify-start xl:max-w-[53%]">
          <label htmlFor="new-date" className="text-lg">
            날짜
          </label>
        </div>
        <div className="flex w-full max-w-[24%] justify-start xl:max-w-[20%]">
          <label htmlFor="new-startTime" className="text-lg">
            시작 시간
          </label>
        </div>
        <div className="flex w-full max-w-[20%] justify-start xl:max-w-[10%]">
          <label htmlFor="new-endTime" className="text-lg">
            종료 시간
          </label>
        </div>
      </div>

      <div className="mb-4 flex w-full max-w-[343px] items-center space-x-1 md:w-[429px] xl:w-[792px]">
        {/* 날짜 입력 필드 */}
        <div className="relative flex flex-1 flex-col">
          <input
            type="text"
            id="new-date"
            name="date"
            value={newSchedule.date}
            onChange={handleChange}
            placeholder="YY/MM/DD"
            className="h-[44px] w-[130px] rounded border border-gray-700 px-3 py-2 text-md-regular md:mr-2 md:h-[56px] md:w-[149px] md:text-lg-regular xl:w-[379px]"
            readOnly
          />
          <button
            type="button"
            onClick={() => setShowDatePicker(prev => !prev)}
            className="absolute right-1 top-1/2 -translate-y-1/2 transform md:right-4 xl:right-10"
          >
            <Image src={calendarIcon} alt="달력 아이콘" width={32} height={32} />
          </button>
          {showDatePicker && (
            <div className="absolute top-full z-50 mt-2">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="YY/MM/DD"
                minDate={new Date()}
                locale={ko}
                inline
              />
            </div>
          )}
        </div>

        {/* 시작 시간, 종료 시간, ~ 기호 컨테이너 */}
        <div className="flex w-[162px] items-center space-x-1 md:w-[213px] xl:w-[318px]">
          <select
            id="new-startTime"
            name="startTime"
            value={newSchedule.startTime}
            onChange={handleChange}
            className="lx:px-3 h-[44px] w-[79px] rounded border border-gray-700 px-1 py-2 text-md-regular md:h-[56px] md:w-[104px] md:text-lg-regular xl:w-[140px]"
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

          <div className="hidden h-[56px] items-center justify-center text-xl xl:flex">~</div>

          <select
            id="new-endTime"
            name="endTime"
            value={newSchedule.endTime}
            onChange={handleChange}
            className="lx:px-3 h-[44px] w-[79px] rounded border border-gray-700 px-1 py-2 text-md-regular md:h-[56px] md:w-[104px] md:text-lg-regular xl:w-[140px]"
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

        {/* 추가 버튼 */}
        <button
          type="button"
          onClick={addSchedule}
          className="relative flex h-[44px] w-[44px] items-center justify-center rounded md:h-[56px] md:w-[56px]"
        >
          <Image src={plusIcon} alt="추가 아이콘" width={56} height={56} />
        </button>
      </div>

      <div className="my-4 h-[1px] w-full bg-primary-gray-300"></div>

      {/* 새로 추가되는 스케줄 */}
      {schedules.map((schedule, index) => (
        <div key={index} className="mb-4 flex w-full items-center space-x-1">
          {/* 날짜 필드 */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={schedule.date}
              readOnly
              className="h-[44px] w-[130px] rounded border border-gray-700 px-3 py-2 text-md-regular md:mr-2 md:h-[56px] md:w-[149px] md:text-lg-regular xl:mr-8 xl:w-[379px]"
            />
          </div>

          {/* 시작 시간, 종료 시간, ~ 기호 컨테이너 */}
          <div className="flex w-[162px] items-center space-x-1 md:w-[213px] xl:w-[318px]">
            <input
              type="text"
              value={schedule.startTime}
              readOnly
              className="lx:px-3 h-[44px] w-[79px] rounded border border-gray-700 px-1 py-2 text-md-regular md:h-[56px] md:w-[104px] md:text-lg-regular xl:w-[140px]"
            />
            <div className="hidden h-[56px] items-center justify-center text-xl font-semibold xl:flex">~</div>
            <input
              type="text"
              value={schedule.endTime}
              readOnly
              className="lx:px-3 h-[44px] w-[79px] rounded border border-gray-700 px-1 py-2 text-md-regular md:h-[56px] md:w-[104px] md:text-lg-regular xl:w-[140px]"
            />
          </div>

          {/* 삭제 버튼 */}
          <button
            type="button"
            onClick={() => removeSchedule(index)}
            className="relative flex h-[44px] w-[44px] items-center justify-center rounded md:h-[56px] md:w-[56px]"
          >
            <Image src={minusIcon} alt="삭제 아이콘" width={56} height={56} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ScheduleForm;
