"use server";

import { UserData } from "@/types/users.type";
import fetchInstance from "@/utils/fetchInstance";

export interface patchUserData {
  nickname?: string | null;
  profileImageUrl?: string | null;
  newPassword?: string | null;
}

const patchUsersMe = async (patchUserData: patchUserData) => {
  try {
    const data = await fetchInstance<UserData>("users/me", {
      method: "PATCH",
      body: JSON.stringify(patchUserData),
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

export default patchUsersMe;
