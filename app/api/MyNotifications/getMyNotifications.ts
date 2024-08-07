"use server";

import { NotificationsData } from "@/types/myNotifications.type";
import fetchInstance from "@/utils/fetchInstance";

const getMyNotifications = async (options?: { cursorId?: number; size?: number }) => {
  try {
    const data = await fetchInstance<NotificationsData>("my-notifications", {
      method: "GET",
      params: options,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "notification failed");
    } else {
      throw new Error("notification failed");
    }
  }
};

export default getMyNotifications;
