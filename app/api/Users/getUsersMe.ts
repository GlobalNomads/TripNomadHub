"use server";

import { UserData } from "@/types/users.type";
import fetchInstance from "@/utils/fetchInstance";

const getUsersMe = async () => {
  try {
    const data = await fetchInstance<UserData>("users/me", {
      method: "GET",
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "user data failed");
    } else {
      throw new Error("user data failed");
    }
  }
};

export default getUsersMe;
