import { useEffect, useMemo, useState } from "react";

// 이미지 URL을 File 객체로 변환하는 함수
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

// URL 배열을 File 배열로 변환하는 훅
const useMultipleFiles = (urls: string[]): File[] => {
  const [files, setFiles] = useState<File[]>([]);

  // useMemo를 사용하여 urls 배열의 참조가 변경되지 않도록 함
  const memoizedUrls = useMemo(() => urls, [urls]);

  useEffect(() => {
    const convertUrlsToFiles = async () => {
      try {
        const filePromises = memoizedUrls.map(async (url, index) => {
          const filename = `image-${index + 1}.jpg`; // 파일 이름을 적절히 지정
          return urlToFile(url, filename);
        });
        const convertedFiles = await Promise.all(filePromises);
        setFiles(convertedFiles);
      } catch (error) {
        console.error("Error converting URLs to files:", error);
      }
    };

    if (memoizedUrls.length > 0) {
      convertUrlsToFiles();
    }
  }, [memoizedUrls]);

  return files;
};

export default useMultipleFiles;
