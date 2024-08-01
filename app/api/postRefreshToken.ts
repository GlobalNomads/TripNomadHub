"use server";

import { cookies } from "next/headers";

interface RequestRefreshToken {
  accessToken?: string;
}

const postRefreshToken = async () => {
  try {
    const cookie = cookies().get("refreshToken");
    const refreshToken = cookie?.value;

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data: RequestRefreshToken = await response.json();

    if (data.accessToken) {
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
