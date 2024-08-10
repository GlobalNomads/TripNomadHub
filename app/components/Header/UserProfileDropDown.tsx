"use client";

import { useAuth } from "@/context/AuthContext";
import useImageLoad from "@/hooks/useImageLoad";
import postLogout from "@api/Auth/postLogout";
import UserProfile from "@icon/userProfileIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserProfileDropdown({
  toggle,
  oppositeToggle,
  setToggle,
  setOppositeToggle,
  profileName,
  profileImage,
}: {
  toggle: boolean;
  oppositeToggle: boolean;
  setToggle: () => void;
  setOppositeToggle: () => void;
  profileName: string;
  profileImage: string | null;
}) {
  const imageError = useImageLoad(profileImage);
  const { getUser } = useAuth();
  const router = useRouter();

  // 로그인 유저 이미지 판단(에러나 파일 미 등록시 디폴트 이미지 선정)
  const userProfileImage = !imageError && profileImage ? profileImage : UserProfile;

  const handleLogout = async () => {
    await postLogout();
    await getUser();
    router.push("/");
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
      <div className="relative aspect-[1/1] h-[32px] w-[32px] border-none">
        <Image fill src={userProfileImage} alt="프로필 이미지" className="rounded-full" />
      </div>

      <button onClick={toggleDropdown} onBlur={closeToggle}>
        <div className="border-none text-md-medium text-primary-gray-800">{profileName}</div>
      </button>

      {toggle && (
        <div className="absolute top-[70%] mt-2.5 flex h-[90px] w-[120px] flex-col items-center gap-y-5 rounded-lg bg-white pb-2.5 pt-2.5 shadow-[0px_4px_20px_0px_#00000014]">
          <span>
            <Link
              href="/myprofile"
              onMouseDown={e => {
                e.preventDefault();
              }}
              className="flex items-center text-md-medium text-primary-gray-800"
            >
              마이 페이지
            </Link>
          </span>

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
