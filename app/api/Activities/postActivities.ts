"use server";

import { Activity, PostActivities } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

const postActivities = async (ActivityData: Activity) => {
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
