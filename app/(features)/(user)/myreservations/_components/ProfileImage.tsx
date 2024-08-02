import { useEffect, useState } from "react";

const ProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("users/me");
      const jsonData = await response.json();
    };
  });
  return <div className="h-[160px] w-[160px] justify-center rounded-full bg-primary-gray-300"></div>;
};

export default ProfileImage;
