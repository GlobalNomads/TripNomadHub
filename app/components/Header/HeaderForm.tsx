"use client";

import { useAuth } from "@/context/AuthContext";
import useToggle from "@/hooks/useToggle";
import Link from "next/link";
import { useEffect } from "react";
import UserProfileDropDown from "./UserProfileDropDown";

function HeaderForm() {
  const { user, getUser } = useAuth();

  const [alarmToggle, setAlarmToggle] = useToggle(false);
  const [menuToggle, setMenuToggle] = useToggle(false);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user ? (
        <div className="z-3">
          <div className="flex items-center gap-4 text-primary-gray-400">
            <UserProfileDropDown
              toggle={menuToggle}
              oppositeToggle={alarmToggle}
              setToggle={setMenuToggle}
              setOppositeToggle={setAlarmToggle}
              profileName={user?.nickname}
              profileImage={user?.profileImageUrl}
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
    </>
  );
}

export default HeaderForm;
