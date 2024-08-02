"use client";
import React, { useState, ChangeEvent } from "react";
import CalendarIcon from "../../assets/icon/ic_gray_calender.svg";
import PlusIcon from "../../assets/icon/ic_plus.svg";

// 시간 옵션 생성 함수
const generateTimeOptions = (): string[] => {
  const times: string[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0");
    for (let j = 0; j < 60; j += 30) {
      const minute = j.toString().padStart(2, "0");
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

// 일정 타입 인터페이스
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

  // removeSchedule 함수 정의
  const removeSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };
  return (
    <div className="flex w-full max-w-[793px] flex-col items-start p-0">
      <div className="mb-4 flex w-full items-center space-x-4">
        <div className="relative flex flex-col" style={{ width: "379px" }}>
          <label htmlFor="new-date" className="mb-2 text-lg font-semibold">
            날짜
          </label>
          <input
            type="date"
            id="new-date"
            name="date"
            value={newSchedule.date}
            onChange={handleChange}
            className="h-[56px] w-full rounded border border-gray-700 px-3 py-2 pl-10"
          />

          <img
            src={CalendarIcon}
            alt="Calendar"
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform"
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

          <div className="mt-8">~</div>

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
            className="primary-green-300 mt-6 rounded px-4 py-2"
            style={{ width: "56px", height: "56px" }}
          >
            <img src={PlusIcon} alt="Add Schedule" />
          </button>
        </div>
      </div>

      <div className="my-4 w-full border-t border-gray-300"></div>

      {schedules.map((schedule, index) => (
        <div key={index} className="mb-4 flex w-full items-center space-x-4">
          <div className="flex flex-col" style={{ width: "379px" }}>
            <input type="text" readOnly className="h-[56px] w-full rounded border border-gray-700 px-3 py-2" />
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

            <div className="mt-8">~</div>

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
              className="mt-6 rounded bg-red-500 bg-red-600 px-4 py-2 text-white"
              style={{ width: "56px", height: "56px" }}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleForm;
