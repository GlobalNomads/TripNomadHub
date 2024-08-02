import fetchInstance from "@/utils/fetchInstance";
import Image from "next/image";

interface Profile {
  profileImageUrl: string | null;
}

async function getProfile(): Promise<Profile> {
  const url = "users/me";
  try {
    return await fetchInstance<Profile>(url);
  } catch (error) {
    console.error("Failed to fetch profile", error);
    throw new Error("Failed to fetch profile");
  }
}

export default async function ProfileImage() {
  const profile = await getProfile();

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full">
      {profile.profileImageUrl ? (
        <Image src={profile.profileImageUrl} alt="Profile picture" layout="fill" objectFit="cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary-gray-300"></div>
      )}
    </div>
  );
}
