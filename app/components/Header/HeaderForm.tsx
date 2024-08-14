"use client";

import { AlarmProvider } from "@/context/AlarmContext";
import useToggle from "@/hooks/useToggle";
import Link from "next/link";
import MessageAlarm from "./Alarm/MessageAlarm";
import UserProfileDropDown from "./UserProfileDropDown";

function HeaderForm({ loginStatus }: { loginStatus: boolean }) {
  const [alarmToggle, setAlarmToggle] = useToggle(false);
  const [menuToggle, setMenuToggle] = useToggle(false);

  return (
    <AlarmProvider>
      {loginStatus ? (
        <div className="z-3">
          <div className="flex items-center gap-4 text-primary-gray-400">
            <MessageAlarm
              toggle={alarmToggle}
              oppositeToggle={menuToggle}
              setToggle={setAlarmToggle}
              setOppositeToggle={setMenuToggle}
            />
            <UserProfileDropDown
              toggle={menuToggle}
              oppositeToggle={alarmToggle}
              setToggle={setMenuToggle}
              setOppositeToggle={setAlarmToggle}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-[25px]">
          <Link href="/signin" className="text-md-medium text-primary-black-200">
            로그인
          </Link>
          <Link href="/signup" className="text-md-medium text-primary-black-200">
            회원가입
          </Link>
        </div>
      )}
    </AlarmProvider>
  );
}

export default HeaderForm;
