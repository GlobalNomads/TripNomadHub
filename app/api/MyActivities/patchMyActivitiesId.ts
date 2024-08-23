"use server";

import { PostActivities, Schedules } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";

export interface MyActivitiesInput {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: string[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: Schedules[];
  schedulesToAdd: Schedules[];
}

const patchMyActivitiesId = async (myActivitiesInput: MyActivitiesInput, activityId: number) => {
  try {
    const data = await fetchInstance<PostActivities>(`my-activities/${activityId}`, {
      method: "PATCH",
      body: JSON.stringify(myActivitiesInput),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "reservation failed");
    } else {
      throw new Error("reservation failed");
    }
  }
};

export default patchMyActivitiesId;
