import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Njk3LCJ0ZWFtSWQiOiI2LTExIiwiaWF0IjoxNzIyMTQ1ODkyLCJleHAiOjE3MjMzNTU0OTIsImlzcyI6InNwLWdsb2JhbG5vbWFkIn0.OpRMgEWUfrFDzmzr8nO0rbMlh1BlmQBpEpwkgcAFLVQ";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}users/me`;
        const response = await fetch(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        setProfileImageUrl(jsonData.profileImageUrl);
      } catch (error) {
        console.error("Fetch profile failed:", error);
        setProfileImageUrl(null);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          width={160}
          height={160}
          priority
          alt="프로필 이미지"
          className="flex h-[160px] w-[160px] justify-center rounded-full object-cover"
        />
      ) : (
        <div className="flex h-[160px] w-[160px] justify-center rounded-full bg-gray-300" />
      )}
    </div>
  );
};

export default ProfileImage;
