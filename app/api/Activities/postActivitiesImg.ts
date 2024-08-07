"use server";

import { ActivitiesImageUrl } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const postActivitiesImg = async (userImage: File): Promise<ActivitiesImageUrl> => {
  const formData = new FormData();
  formData.append("image", userImage);

  try {
    const data: ActivitiesImageUrl = await fetchInstance<ActivitiesImageUrl>("activities/image", {
      method: "POST",
      body: formData,
      isMultipart: true,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "image failed");
    } else {
      throw new Error("image failed");
    }
  }
};

export default postActivitiesImg;
