"use server";

import { OauthData } from "@/types/oauth.type";
import fetchInstance from "@/utils/fetchInstance";

export interface OauthInput {
  redirectUri: string;
  token: string;
}

const postOauthApps = async (provider: string, oauthInput: OauthInput) => {
  try {
    const data = await fetchInstance<OauthData>(`oauth/sign-in/${provider}`, {
      method: "POST",
      body: JSON.stringify(oauthInput),
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "reservation failed");
    } else {
      throw new Error("reservation failed");
    }
  }
};

export default postOauthApps;
