"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { NotificationList } from "@/types/myNotifications.type";
import deleteNotifications from "@api/MyNotifications/deleteMyNotifications";
import getNotifications from "@api/MyNotifications/getMyNotifications";

interface AlarmContextType {
  alarmMessages: NotificationList[];
  getAlarmMessages: () => void;
  removeAlarmMessage: (id: number) => void;
  count: number;
}

const AlarmContext = createContext<AlarmContextType>({
  alarmMessages: [],
  getAlarmMessages: () => {},
  removeAlarmMessage: () => {},
  count: 0,
});

function AlarmProvider({ children }: { children: ReactNode }) {
  const [alarmMessages, setAlarmMessages] = useState<NotificationList[]>([]);
  const [count, setCount] = useState<number>(0);

  const getAlarmMessages = async () => {
    const { totalCount, notifications } = await getNotifications({ size: 10 });
    if (notifications) {
      // 중복 알림 제거
      const newNotifications = notifications.filter(n => !alarmMessages.some(m => m.id === n.id));

      setAlarmMessages(prev => [...prev, ...newNotifications]);
    }

    if (totalCount !== undefined) setCount(() => totalCount);
  };

  const removeAlarmMessage = async (id: number) => {
    await deleteNotifications(id);
    setAlarmMessages(alarmMessages.filter(m => m.id !== id));
    setCount(prev => prev - 1);
  };

  const values = useMemo(() => ({ alarmMessages, getAlarmMessages, removeAlarmMessage, count }), [alarmMessages]);

  return <AlarmContext.Provider value={values}>{children}</AlarmContext.Provider>;
}

function useAlarm() {
  const context = useContext(AlarmContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 쓰세요");
  }
  return context;
}

export { AlarmProvider, useAlarm };
