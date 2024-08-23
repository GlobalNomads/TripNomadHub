"use client";

import { useEffect } from "react";

const useCleanupOnUnload = () => {
  useEffect(() => {
    const deleteCookie = (name: string) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 페이지가 종료되거나 새로고침 될 때의 로직
      if (sessionStorage.getItem("isReload") === "true") {
        // 새로고침의 경우, sessionStorage에 플래그를 설정하고 쿠키를 삭제하지 않음
        sessionStorage.removeItem("isReload");
      } else {
        // 페이지 종료 시 쿠키 삭제
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      }

      // 페이지를 떠나기 전에 경고 메시지를 표시할 수 있습니다.
      event.preventDefault();
      event.returnValue = ""; // 일부 브라우저에서 경고 메시지를 표시하기 위해 필요
    };

    const handleLoad = () => {
      // 페이지 로드 시, 새로고침인지 확인하기 위한 플래그 설정
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        sessionStorage.setItem("isReload", "true");
      } else {
        sessionStorage.removeItem("isReload");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
    };
  }, []);
};

export default useCleanupOnUnload;
