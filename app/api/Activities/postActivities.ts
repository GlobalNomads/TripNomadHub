"use server";

import { PostActivities } from "@/types/activities.type";
import { ActivityPostData } from "@/types/myActivities.type";
import fetchInstance from "@/utils/fetchInstance";

const postActivities = async (ActivityData: ActivityPostData) => {
  try {
    const data = await fetchInstance<PostActivities>("activities", {
      method: "POST",
      body: JSON.stringify(ActivityData),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "activities data failed");
    } else {
      throw new Error("activities data failed");
    }
  }
};

export default postActivities;
