"use server";

import fetchInstance from "@/utils/fetchInstance";
import { cookies } from "next/headers";

interface RequestRefreshToken {
  accessToken?: string;
  refreshToken?: string;
}

const postRefreshToken = async () => {
  try {
    const data = await fetchInstance<RequestRefreshToken>("auth/login", {
      method: "POST",
    });

    if (data.accessToken && data.refreshToken) {
      cookies().set("accessToken", data.accessToken);
    } else {
      throw new Error("Access token is missing");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Re-issuance failed");
    } else {
      throw new Error("Re-issuance failed");
    }
  }
};

export default postRefreshToken;
