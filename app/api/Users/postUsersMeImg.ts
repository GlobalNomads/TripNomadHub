import { UserImageUrl } from "@/types/users.type";
import fetchInstance from "@/utils/fetchInstance";

const postUsersMeImg = async (userImage: File): Promise<UserImageUrl> => {
  const formData = new FormData();
  formData.append("image", userImage);

  try {
    const data: UserImageUrl = await fetchInstance<UserImageUrl>("users/me/image", {
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

export default postUsersMeImg;
