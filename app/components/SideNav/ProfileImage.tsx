"use client";

import getUsersMe from "@/api/Users/getUsersMe";
import useImageLoad from "@/hooks/useImageLoad";
import { useUserStore } from "@/utils/userStore";
import DefalutProfile from "@icon/ic_default_reviewprofile.png";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ProfileImage = () => {
  const { avatarImageUrl } = useUserStore(state => state);

  const { data: userData } = useQuery({
    queryKey: ["getUsersMe"],
    queryFn: getUsersMe,
    staleTime: 60000,
    retry: 2,
  });

  const profileImageUrl = avatarImageUrl || userData?.profileImageUrl;
  const imageError = useImageLoad(profileImageUrl);

  const userProfileImage = !imageError && profileImageUrl ? profileImageUrl : DefalutProfile;

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
      <Image
        src={userProfileImage}
        priority
        alt="Profile picture"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        className="rounded-full"
      />
    </div>
  );
};
export default ProfileImage;
