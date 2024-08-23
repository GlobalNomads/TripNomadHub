import { useEffect, useState } from "react";

function useUpdateActivitySize() {
  const [activitySize, setActivitySize] = useState(4);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 브라우저 환경에서만 실행
      const updateSize = () => {
        const width = window.innerWidth;
        if (width >= 1024) {
          setActivitySize(4); // PC 크기
        } else if (width >= 768) {
          setActivitySize(3); // 태블릿 크기
        } else {
          setActivitySize(2); // 모바일 크기
        }
      };

      updateSize(); // 초기 로드 시 설정
      window.addEventListener("resize", updateSize);

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, []);

  return { activitySize };
}

export default useUpdateActivitySize;
