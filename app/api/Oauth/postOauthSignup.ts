"use server";

import { OauthSignupData } from "@/types/oauth.type";
import fetchInstance from "@/utils/fetchInstance";

export interface OauthInput {
  nickname: string;
  redirectUri: string;
  token: string;
}

const postOauthApps = async (provider: string, oauthInput: OauthInput) => {
  try {
    const data = await fetchInstance<OauthSignupData>(`oauth/sign-up/${provider}`, {
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
