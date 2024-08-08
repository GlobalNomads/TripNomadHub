/*
    미완성
    체험 등록 페이지의 체험 시간 입력 컴포넌트
    체험 등록에 필요한 시간을 입력하는 폼
*/

"use client";

import React, { useState, ChangeEvent } from "react";

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

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

const ScheduleForm: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState<Schedule>({ date: "", startTime: "", endTime: "" });

  const addSchedule = () => {
    if (newSchedule.date && newSchedule.startTime && newSchedule.endTime) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule({ date: "", startTime: "", endTime: "" });
    }
  };

  const removeSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  return (
    <div className="flex w-full max-w-[792px] flex-col items-start p-0">
      <h2 className="mb-2 text-[24px] font-semibold">예약 가능한 시간대</h2>
      <div className="mb-4 flex w-full items-center space-x-4">
        <div className="relative flex flex-col" style={{ width: "379px" }}>
          <label htmlFor="new-date" className="mb-2 text-lg font-semibold">
            날짜
          </label>
          <input
            type="text"
            id="new-date"
            name="date"
            value={newSchedule.date}
            onChange={handleChange}
            placeholder="YY/MM/DD"
            className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 pl-6"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-col" style={{ width: "140px" }}>
            <label htmlFor="new-startTime" className="mb-2 text-lg font-semibold">
              시작 시간
            </label>
            <select
              id="new-startTime"
              name="startTime"
              value={newSchedule.startTime}
              onChange={handleChange}
              className="h-[56px] w-full overflow-y-scroll rounded border border-gray-700 px-3 py-2"
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

          <div className="flex h-[56px] items-center justify-center text-xl font-semibold">~</div>

          <div className="flex flex-col" style={{ width: "140px" }}>
            <label htmlFor="new-endTime" className="mb-2 text-lg font-semibold">
              종료 시간
            </label>
            <select
              id="new-endTime"
              name="endTime"
              value={newSchedule.endTime}
              onChange={handleChange}
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
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
            className="mt-6 flex items-center justify-center rounded bg-primary-green-300"
            style={{ width: "56px", height: "56px" }}
          >
            <svg
              className="h-[26.5px] w-[26.5px] text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="my-4 w-full border-t border-gray-300"></div>

      {schedules.map((schedule, index) => (
        <div key={index} className="mb-4 flex w-full items-center space-x-4">
          <div className="flex flex-col" style={{ width: "379px" }}>
            <input
              type="text"
              value={schedule.date}
              readOnly
              className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex flex-col" style={{ width: "140px" }}>
              <input
                type="text"
                value={schedule.startTime}
                readOnly
                className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
              />
            </div>

            <div className="flex h-[56px] items-center justify-center text-xl font-semibold">~</div>

            <div className="flex flex-col" style={{ width: "140px" }}>
              <input
                type="text"
                value={schedule.endTime}
                readOnly
                className="h-[56px] w-full rounded border border-gray-700 px-3 py-2"
              />
            </div>

            <button
              type="button"
              onClick={() => removeSchedule(index)}
              className="mt-6 flex items-center justify-center rounded border border-gray-700 bg-white"
              style={{ width: "56px", height: "56px" }}
            >
              <svg
                className="text-prmary-gray_700 h-[26.5px] w-[26.5px]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleForm;
