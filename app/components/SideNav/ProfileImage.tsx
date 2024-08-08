"use client";
import getUsersMe from "@/api/Users/getUsersMe";
import { UserData } from "@/types/users.type";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileImage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsersMe();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
      {userData.profileImageUrl ? (
        <Image src={userData.profileImageUrl} priority alt="Profile picture" layout="fill" objectFit="cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary-gray-300"></div>
      )}
    </div>
  );
};

export default ProfileImage;
