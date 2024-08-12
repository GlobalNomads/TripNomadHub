"use client";

import getUsersMe from "@/api/Users/getUsersMe";
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
        <div className="flex h-full w-full items-center justify-center bg-primary-gray-300"></div>
      ) : (
        <Image src={userData.profileImageUrl} priority alt="Profile picture" layout="fill" objectFit="cover" />
      )}
    </div>
  );
};
export default ProfileImage;
