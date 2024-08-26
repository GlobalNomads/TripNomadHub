// lib/auth.ts
import Cookies from "js-cookie";

export const getLoginStatus = (): boolean => {
  const accessToken = Cookies.get("accessToken");
  return !!accessToken; // 토큰이 존재하면 true, 없으면 false 반환
};
