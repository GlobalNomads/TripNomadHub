import fetchInstance from "@/utils/fetchInstance";

export default async function updateProfileImageUrl(imageUrl: string): Promise<void> {
  const url = "users/me";

  try {
    await fetchInstance(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ profileImageUrl: imageUrl }),
    });
  } catch (error) {
    throw new Error("Failed to update profile image URL");
  }
}
