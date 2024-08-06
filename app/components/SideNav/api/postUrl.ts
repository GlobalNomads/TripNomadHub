import fetchInstance from "@/utils/fetchInstance";
import type { Response } from "node-fetch"; // Import the Response type

interface ImageUrl {
  imageUrl: string;
}

export default async function createImageUrl(file: File): Promise<ImageUrl> {
  const url = "users/me/image";
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response: Response = await fetchInstance(url, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // Optional: Validate result to ensure it matches the ImageUrl interface
    return result;
  } catch (error) {
    console.error("Failed to create ImageUrl:", error);
    throw error; // Re-throw the original error
  }
}
