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
    queryFn: getUsersMe,
  });

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
      {isLoading || error || !userData?.profileImageUrl ? (
        <div className="flex h-full w-full items-center justify-center">
          <Image
            src={DefalutProfile}
            priority
            alt="Default profile"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
        </div>
      ) : (
        <Image
          src={userData.profileImageUrl}
          priority
          alt="Profile picture"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-full"
        />
      )}
    </div>
  );
};
export default ProfileImage;
