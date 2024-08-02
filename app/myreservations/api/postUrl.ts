import fetchInstance from "@/utils/fetchInstance";

interface ImageUrl {
  imageUrl: string;
}

export default async function createImageUrl(file: File): Promise<ImageUrl> {
  const url = "users/me/image";
  const formData = new FormData();
  formData.append("file", file);

  try {
    return await fetchInstance(url, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });
  } catch (error) {
    throw new Error("Failed to create ImageUrl");
  }
}
