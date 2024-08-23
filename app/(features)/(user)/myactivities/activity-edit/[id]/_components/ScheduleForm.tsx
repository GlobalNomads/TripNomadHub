"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  onAddSchedulesChange: (schedules: Schedule[]) => void;
  onDeleteSchedulesChange: (deletedSchedules: Schedule[]) => void;
  settingSchedules: Schedule[];
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  schedules,
  onAddSchedulesChange,
  onDeleteSchedulesChange,
  settingSchedules,
}) => {
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 모든 스케줄을 관리합니다.
  const [allSchedules, setAllSchedules] = useState<Schedule[]>(schedules);
  const [deletedSettingSchedules, setDeletedSettingSchedules] = useState<Schedule[]>([]);

  // 새로운 스케줄을 추가하는 함수
  const addSchedule = useCallback(() => {
    if (newSchedule.date && newSchedule.startTime && newSchedule.endTime) {
      // 종료 시간이 시작 시간보다 빠르거나 같은지 확인
      if (newSchedule.startTime >= newSchedule.endTime) {
        alert("종료 시간은 시작 시간보다 늦어야 합니다.");
        return;
      }

      // 스케줄 목록에 새 스케줄 추가
      const updatedSchedules = [...allSchedules, newSchedule];
      setAllSchedules(updatedSchedules);
      onAddSchedulesChange(updatedSchedules);

      // 입력 필드를 초기화
      setNewSchedule({ date: "", startTime: "", endTime: "" });
      setSelectedDate(null);
    }
  }, [newSchedule, allSchedules, onAddSchedulesChange]);

  // 스케줄을 삭제하는 함수
  const removeSchedule = useCallback(
    (index: number) => {
      const scheduleToRemove = allSchedules[index];
      const newSchedules = allSchedules.filter((_, i) => i !== index);

      // 삭제된 스케줄이 settingSchedules에 포함된 경우만 필터링
      const isDeletedScheduleSettingSchedule = settingSchedules.some(
        schedule =>
          schedule.date === scheduleToRemove.date &&
          schedule.startTime === scheduleToRemove.startTime &&
          schedule.endTime === scheduleToRemove.endTime,
      );

      const updatedDeletedSettingSchedules = isDeletedScheduleSettingSchedule
        ? [...deletedSettingSchedules, scheduleToRemove]
        : deletedSettingSchedules;

      setDeletedSettingSchedules(updatedDeletedSettingSchedules);
      onDeleteSchedulesChange(updatedDeletedSettingSchedules);
      setAllSchedules(newSchedules);
    },
    [allSchedules, settingSchedules, deletedSettingSchedules, onDeleteSchedulesChange],
  );

  // 날짜 변경을 처리하는 함수
  const handleDateChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      if (date) {
        const formattedDate = format(date, "yyyy-MM-dd"); // 날짜 형식을 "yyyy-MM-dd"로 변경
        setNewSchedule({ ...newSchedule, date: formattedDate });
      }
      setShowDatePicker(false);
    },
    [newSchedule],
  );

  // 입력 필드의 변경을 처리하는 함수
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewSchedule({ ...newSchedule, [name]: value });
    },
    [newSchedule],
  );

  // `schedules`와 `settingSchedules`의 조합을 유지합니다.
  useEffect(() => {
    // 기존 스케줄에 `settingSchedules`를 추가
    const combinedSchedules = [...schedules];
    const settingScheduleMap = new Map<string, Schedule>();

    // 설정된 스케줄을 맵에 저장
    settingSchedules.forEach(schedule => {
      settingScheduleMap.set(`${schedule.date}_${schedule.startTime}_${schedule.endTime}`, schedule);
    });

    // 기존 스케줄에서 삭제되지 않은 설정 스케줄만 포함
    const updatedSchedules = combinedSchedules.map(schedule => {
      const key = `${schedule.date}_${schedule.startTime}_${schedule.endTime}`;
      if (settingScheduleMap.has(key)) {
        settingScheduleMap.delete(key); // 삭제되지 않은 설정 스케줄
      }
      return schedule;
    });

    // 남아 있는 설정 스케줄을 추가
    updatedSchedules.push(...Array.from(settingScheduleMap.values()));
    setAllSchedules(updatedSchedules);
  }, [schedules, settingSchedules]);

  useEffect(() => {
    // 삭제된 스케줄을 업데이트
    onDeleteSchedulesChange(deletedSettingSchedules);
  }, [deletedSettingSchedules, onDeleteSchedulesChange]);

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

      {allSchedules.length > 0 && (
        <div className="flex w-full flex-col">
          {allSchedules.map((schedule, index) => (
            <div key={index} className="flex items-center space-x-4 border-b border-gray-300 py-2">
              <div className="flex w-full max-w-[34.5%] items-center justify-start text-lg">{schedule.date}</div>
              <div className="flex w-full max-w-[33.33%] items-center justify-center text-lg">{schedule.startTime}</div>
              <div className="flex w-full max-w-[12.5%] items-center justify-end text-lg">{schedule.endTime}</div>
              <button
                type="button"
                onClick={() => removeSchedule(index)}
                className="relative flex h-[32px] w-[32px] items-center justify-center rounded"
              >
                <Image src={minusIcon} alt="삭제 아이콘" width={32} height={32} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleForm;
