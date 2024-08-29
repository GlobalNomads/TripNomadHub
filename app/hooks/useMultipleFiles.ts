import { useEffect, useMemo, useState } from "react";

// 이미지 URL을 File 객체로 변환하는 함수
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url, {
    mode: "no-cors", // CORS를 우회하여 요청
  });
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

// id와 imageUrl이 포함된 객체 배열을 File 객체 배열로 변환하는 훅
const useMultipleFiles = (
  images: { id?: number; imageUrl: string }[], // `id`의 타입을 `number | undefined`에서 `number?`로 변경
): { id?: number; file: File }[] => {
  // 반환 타입도 같은 형식으로 맞춰야 함
  const [files, setFiles] = useState<{ id?: number; file: File }[]>([]); // 초기 상태 정의 수정

  // useMemo를 사용하여 images 배열의 참조가 변경되지 않도록 함
  const memoizedImages = useMemo(() => images, [images]);

  useEffect(() => {
    const convertImagesToFiles = async () => {
      try {
        const filePromises = memoizedImages.map(async (image, index) => {
          const filename = `image-${index + 1}.jpg`; // 파일 이름을 적절히 지정
          const file = await urlToFile(image.imageUrl, filename);
          return { id: image.id, file }; // id와 변환된 file 객체를 반환
        });
        const convertedFiles = await Promise.all(filePromises);
        setFiles(convertedFiles);
      } catch (error) {
        console.error("Error converting URLs to files:", error);
      }
    };

    if (memoizedImages.length > 0) {
      convertImagesToFiles();
    }
  }, [memoizedImages]);

  return files;
};

export default useMultipleFiles;
