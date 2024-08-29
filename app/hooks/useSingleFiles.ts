import { useEffect, useState } from "react";

// 이미지 URL을 File 객체로 변환하는 함수
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url, {
    mode: "no-cors", // CORS를 우회하여 요청
  });
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

// 단일 URL을 File로 변환하는 훅
const useSingleFiles = (url: string): File | null => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const convertUrlToFile = async () => {
      const file = await urlToFile(url, "image.jpg"); // 기본 파일명 설정
      setFile(file);
    };

    if (url) {
      convertUrlToFile();
    }
  }, [url]);

  return file;
};

export default useSingleFiles;
