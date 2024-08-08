"use server";

import { cookies } from "next/headers";

const postLogout = async () => {
  try {
    if (cookies().get("refreshToken") && cookies().get("refreshToken")) {
      cookies().delete("accessToken");
      cookies().delete("refreshToken");
    } else {
      throw new Error("Access token is missing");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "logout failed");
    } else {
      throw new Error("logout failed");
    }
  }
};

export default postLogout;
