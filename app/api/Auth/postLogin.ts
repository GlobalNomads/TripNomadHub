import { UserData } from "@/types/auth.type";
import fetchInstance from "@/utils/fetchInstance";
import Cookies from "js-cookie";

export interface UserInput {
  email: string;
  password: string;
}

const postLogin = async (userInput: UserInput) => {
  try {
    const data = await fetchInstance<UserData>("auth/login", {
      method: "POST",
      body: JSON.stringify(userInput),
    });

    if (data.accessToken && data.refreshToken) {
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);
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
