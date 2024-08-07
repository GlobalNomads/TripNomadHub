"use server";

import fetchInstance from "@/utils/fetchInstance";

const deleteMyNotifications = async (activityId: number) => {
  try {
    await fetchInstance(`my-activities/${activityId}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Delete notification failed");
    } else {
      throw new Error("Delete notification failed");
    }
  }
};

export default deleteMyNotifications;
