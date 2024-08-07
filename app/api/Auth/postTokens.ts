"use server";

import { RequestToken } from "@/types/auth.type";
import fetchInstance from "@/utils/fetchInstance";
import { cookies } from "next/headers";

const postTokens = async () => {
  try {
    const data = await fetchInstance<RequestToken>("auth/tokens", {
      method: "POST",
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
      throw new Error(error.message || "Re-issuance failed");
    } else {
      throw new Error("Re-issuance failed");
    }
  }
};

export default postTokens;
