import fetchInstance from "@/utils/fetchInstance";
import Image from "next/image";

interface Profile {
  profileImageUrl: string;
}

async function getProfile(): Promise<Profile> {
  const url = "users/me";
  try {
    return await fetchInstance(url);
  } catch (error) {
    throw new Error("Failed to fetch profile");
  }
}

export default async function ProfileImage() {
  const profile = await getProfile();

  return (
    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-full bg-primary-gray-300">
      {profile.profileImageUrl && (
        <Image src={profile.profileImageUrl} alt="Profile picture" layout="fill" objectFit="cover" />
      )}
    </div>
  );
}
