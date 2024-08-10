"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { useAlarm } from "@/context/AlarmContext";
import useToggle from "@/hooks/useToggle";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import NoAlarmMessage from "./NoAlarmMessage";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function AlarmModal({ onClose }: { onClose: () => void }) {
  const { getAlarmMessages, alarmMessages, removeAlarmMessage, count } = useAlarm();
  const [hasMore, setHasMore] = useToggle(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (alarmMessages.length < 10) getAlarmMessages();
  }, []);

  useEffect(() => {
    if (inView) {
      getAlarmMessages();
    } else if (alarmMessages.length === count) setHasMore();
  }, [inView]);

  return (
    <ul style={{ zIndex: 2 }} className="flex flex-col gap-y-5 px-[1.5em] pt-[1.125em] text-[1.25em]">
      <div className="flex"></div>
      {alarmMessages.length > 0 ? (
        <div className="flex max-h-[85dvh] flex-col gap-y-5 overflow-y-scroll scroll-smooth px-[5px] py-[5px]">
          {alarmMessages.map(m => (
            <li
              key={m.id}
              className="flex flex-col rounded-[8px] bg-white p-5 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)]"
            >
              <div className="flex justify-between pb-[10px]">
                <h2 className="relative top-[-6px] flex flex-col items-start justify-start text-4xl leading-4 text-primary-red-200">
                  .
                </h2>
                <button
                  onClickCapture={() => {
                    removeAlarmMessage(m.id);
                  }}
                  className="text-primary-gray-900 flex justify-end text-sm"
                >
                  X
                </button>
              </div>
              <div className="flex flex-col items-start justify-stretch text-left">
                <h3 className="flex max-w-[250px] flex-1 text-sm font-normal leading-6 text-primary-black-100">
                  {m.content}
                </h3>
                <h3 className="text-sm font-normal leading-6 text-primary-gray-800">
                  {dayjs(m.createdAt).fromNow(false)}
                </h3>
              </div>
            </li>
          ))}
          {hasMore && <div ref={ref}>loading ...</div>}
        </div>
      ) : (
        <NoAlarmMessage />
      )}
    </ul>
  );
}
