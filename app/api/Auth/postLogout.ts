import Cookies from "js-cookie";

const postLogout = async () => {
  try {
    if (Cookies.get("accessToken") && Cookies.get("refreshToken")) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
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
