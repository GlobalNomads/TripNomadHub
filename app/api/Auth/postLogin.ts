"use server";

import { UserData } from "@/types/auth.type";
import fetchInstance from "@/utils/fetchInstance";

import { cookies } from "next/headers";

export interface UserInput {
  email: string;
  nickname?: string;
  password: string;
}

const postLogin = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance<UserData>("auth/login", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    if (data.accessToken && data.refreshToken) {
      cookies().set("accessToken", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);
    } else {
      throw new Error("Access token is missing");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "login failed");
    } else {
      throw new Error("login failed");
    }
  }
};

export default postLogin;
