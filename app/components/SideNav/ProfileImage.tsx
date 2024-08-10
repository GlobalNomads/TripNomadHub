// "use client";
// import getUsersMe from "@/api/Users/getUsersMe";
// import { UserData } from "@/types/users.type";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const ProfileImage = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getUsersMe();
//         setUserData(data);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (!userData) return <div>Loading...</div>;

//   return (
//     <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
//       {userData.profileImageUrl ? (
//         <Image src={userData.profileImageUrl} priority alt="Profile picture" layout="fill" objectFit="cover" />
//       ) : (
//         <div className="flex h-full w-full items-center justify-center bg-primary-gray-300"></div>
//       )}
//     </div>
//   );
// };

// export default ProfileImage;

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
    // Only execute the query on the client-side
    enabled: typeof window !== "undefined",
  });

  if (isLoading) return <span>Profile Loading...</span>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
      {userData?.profileImageUrl ? (
        <Image src={userData.profileImageUrl} priority alt="Profile picture" layout="fill" objectFit="cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary-gray-300"></div>
      )}
    </div>
  );
};
export default ProfileImage;
