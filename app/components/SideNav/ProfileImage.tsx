"use server";

import getUsersMe from "@/api/Users/getUsersMe";
import { UserData } from "@/types/users.type";
import Image from "next/image";

const ProfileImage = async () => {
  try {
    const userData: UserData = await getUsersMe();
    return (
      <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
        {userData.profileImageUrl ? (
          <Image src={userData.profileImageUrl} alt="Profile picture" layout="fill" objectFit="cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-gray-300"></div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return <div>Error loading profile</div>;
  }
};

export default ProfileImage;
