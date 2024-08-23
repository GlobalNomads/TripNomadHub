"use client";

import { useEffect } from "react";

const useCleanupOnUnload = () => {
  useEffect(() => {
    if (typeof window === "undefined") return; // 서버 사이드 렌더링에서는 아무 것도 하지 않음

    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    const handleVisibilityChange = () => {
      // 페이지가 숨겨질 때 새로고침 플래그 설정
      if (document.visibilityState === "hidden") {
        sessionStorage.setItem("isReload", "true");
      }
    };

    const handleUnload = () => {
      // 페이지 종료 시 쿠키 삭제
      if (sessionStorage.getItem("isReload") !== "true") {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      }
      sessionStorage.removeItem("isReload"); // 종료 후 플래그 제거
    };

    const handleLoad = () => {
      // 페이지가 로드될 때 새로고침 여부를 확인하고 플래그를 제거
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        sessionStorage.setItem("isReload", "true");
      } else {
        sessionStorage.removeItem("isReload");
      }
    };

    // 페이지 로드 시 플래그 초기화
    window.addEventListener("load", handleLoad);

    // 페이지가 숨겨질 때 플래그 설정
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 페이지 종료 시 쿠키 삭제
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
};

export default useCleanupOnUnload;
