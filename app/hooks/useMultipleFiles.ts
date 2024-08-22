import { useEffect, useState } from "react";

// 이미지 URL을 File 객체로 변환하는 함수
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

// URL 배열을 File 배열로 변환하는 훅
const useMultipleFiles = (urls: string[]): File[] => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const convertUrlsToFiles = async () => {
      const filePromises = urls.map(async (url, index) => {
        const filename = `image-${index + 1}.jpg`; // 파일 이름을 적절히 지정
        return urlToFile(url, filename);
      });
      const convertedFiles = await Promise.all(filePromises);
      setFiles(convertedFiles);
    };

    if (urls.length > 0) {
      convertUrlsToFiles();
    }
  }, [urls]);

  return files;
};

export default useMultipleFiles;
