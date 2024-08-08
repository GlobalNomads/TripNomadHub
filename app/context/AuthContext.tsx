"use client";

import { UserData } from "@/types/users.type";
import getUsersMe from "@api/Users/getUsersMe";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface AuthContextType {
  user: UserData | null;
  getUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  getUser: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);

  const values = useMemo(() => {
    const getUser = async () => {
      try {
        const newUser = await getUsersMe();
        setUser(() => newUser);
      } catch (error) {
        setUser(() => null);
      }
    };

    return { user, getUser };
  }, [user]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 쓰세요");
  }
  return context;
}

export { AuthProvider, useAuth };
