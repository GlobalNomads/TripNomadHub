"use client";

import { AlarmProvider } from "@/context/AlarmContext";
import useToggle from "@/hooks/useToggle";
import debounce from "@/utils/debounce";
import Link from "next/link";
import { useEffect, useState } from "react";
import MessageAlarm from "./Alarm/MessageAlarm";
import UserProfileDropDown from "./UserProfileDropDown";

function HeaderForm({ loginStatus }: { loginStatus: boolean }) {
  const [alarmToggle, setAlarmToggle] = useToggle(false);
  const [menuToggle, setMenuToggle] = useToggle(false);
  const [windowWidth, setWindowWidth] = useState(0);

  //모바일 사이즈때 다른 화면 구조를 맞추기 위해 사이즈 판별용(useEffect)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    if (windowWidth === 0) setWindowWidth(window.innerWidth);
    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("beforeunload", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.removeEventListener("beforeunload", debouncedHandleResize);
    };
  }, [windowWidth]);

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
