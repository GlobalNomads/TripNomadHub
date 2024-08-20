"use client";

import getUsersMe from "@/api/Users/getUsersMe";
import DefalutProfile from "@icon/ic_default_reviewprofile.png";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const ProfileImage = () => {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getUsersMe"],
    queryFn: () => getUsersMe(),

    enabled: typeof window !== "undefined",
  });

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
      {isLoading || error || !userData?.profileImageUrl ? (
        <div className="flex h-full w-full items-center justify-center bg-primary-gray-300">
          <Image src={DefalutProfile} priority alt="Default profile" layout="fill" />
        </div>
      ) : (
        <Image src={userData.profileImageUrl} priority alt="Profile picture" layout="fill" objectFit="cover" />
      )}
    </div>
  );
};
export default ProfileImage;
