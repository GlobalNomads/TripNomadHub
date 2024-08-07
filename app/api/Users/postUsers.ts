"use server";

import { UserData } from "@/types/users.type";
import fetchInstance from "@/utils/fetchInstance";

export interface UserInput {
  email: string;
  nickname: string;
  password: string;
}

const postUsers = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance<UserData>("users", {
      method: "POST",
      body: JSON.stringify(userInput),
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

export default postUsers;
