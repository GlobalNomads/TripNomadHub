"use server";

import { UserInput } from "@/types/auth.type";
import fetchInstance from "@/utils/fetchInstance";

export interface User {
  id?: number;
  email?: string;
  nickname?: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

const postUsers = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance<User>("users", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "login failed");
    } else {
      throw new Error("login failed");
    }
  }
};

export default postUsers;
