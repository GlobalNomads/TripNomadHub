"use client";

import { useEffect } from "react";

const useCleanupOnUnload = () => {
  useEffect(() => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    const handleBeforeUnload = () => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useCleanupOnUnload;
