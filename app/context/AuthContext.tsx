"use client";

import { getLoginStatus } from "@/lib/auth"; // 로그인 상태를 가져오는 함수
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // 로그인 상태를 동기화하는 useEffect
  useEffect(() => {
    const status = getLoginStatus(); // 클라이언트에서만 실행되는 함수
    setIsLoggedIn(status);
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
