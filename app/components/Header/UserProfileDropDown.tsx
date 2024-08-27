"use client";

import getUsersMe from "@/api/Users/getUsersMe";
import { useAuth } from "@/context/AuthContext";
import useImageLoad from "@/hooks/useImageLoad";
import useWindowSize from "@/hooks/useWindowSize";
import { UserData } from "@/types/users.type";
import { useUserStore } from "@/utils/userStore";
import postLogout from "@api/Auth/postLogout";
import UserProfile from "@icon/ic_default_reviewprofile.png";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropDownBox from "./DropDownBox";

function UserProfileDropdown({
  toggle,
  oppositeToggle,
  setToggle,
  setOppositeToggle,
}: {
  toggle: boolean;
  oppositeToggle: boolean;
  setToggle: () => void;
  setOppositeToggle: () => void;
}) {
  const { data } = useQuery<UserData>({
    queryKey: ["getUsersMe"],
    queryFn: () => getUsersMe(),
    staleTime: 60000,
    retry: 2,
  });

  const { avatarImageUrl } = useUserStore(state => state); // Get profile image URL from zustand store
  const profileImage = avatarImageUrl || data?.profileImageUrl;
  const imageError = useImageLoad(profileImage);
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // 로그인 유저 이미지 판단(에러나 파일 미 등록시 디폴트 이미지 선정)
  const userProfileImage = !imageError && profileImage ? profileImage : UserProfile;
  const windowWidth = useWindowSize();
  const isMoblie = windowWidth < 451;

  const handleLogout = async () => {
    await postLogout(); // 로그아웃 API 호출
    setIsLoggedIn(false); // 로그아웃 후 전역 상태 업데이트
    setToggle(); // 드롭다운 닫기
    router.push("/"); // 로그아웃 후 홈 페이지로 리다이렉트
  };

  const toggleDropdown = () => {
    setToggle();
    if (oppositeToggle) setOppositeToggle();
  };

  const closeToggle = () => {
    if (toggle) setToggle();
  };

  return (
    <div className="flex gap-2 border-l-2 border-solid border-primary-gray-200 pl-4">
      <button onClick={toggleDropdown} onBlur={closeToggle} className="flex items-center gap-4">
        <div className="relative aspect-[1/1] h-[32px] w-[32px] border-none">
          <Image fill src={userProfileImage} alt="프로필 이미지" className="rounded-full" sizes="32" />
        </div>

        <div className="text-md-medium text-primary-gray-800">{data?.nickname}</div>
      </button>

      {toggle && (
        <div
          className={`${isMoblie && "right-4"} absolute top-[70%] mt-2.5 flex h-[220px] w-[120px] flex-col items-center gap-y-5 rounded-lg bg-white pb-2.5 pt-2.5 shadow-[0px_4px_20px_0px_#00000014]`}
        >
          <DropDownBox href={"/myprofile"}>마이 페이지</DropDownBox>
          <DropDownBox href={"/myreservations"}>예약 내역</DropDownBox>
          <DropDownBox href={"/myactivities"}>내 체험 관리</DropDownBox>
          <DropDownBox href={"/reservation-schedule"}>예약 현황</DropDownBox>

          <button
            onClick={handleLogout}
            onMouseDown={e => {
              e.preventDefault();
            }}
            className="flex items-center text-md-medium text-primary-gray-800"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfileDropdown;
