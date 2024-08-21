import { useEffect, useState } from "react";

const useImageLoad = (imageUrl?: string | null) => {
  const [imgError, setImgError] = useState<boolean | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!imageUrl) {
      setImgError(true);
      setLoading(false);
      return;
    }

    const img = new Image();
    img.src = imageUrl;

    setLoading(true); // 이미지 로드 시작

    img.onload = () => {
      setImgError(false);
      setLoading(false); // 로드 성공
    };

    img.onerror = () => {
      setImgError(true);
      setLoading(false); // 로드 실패
    };
  }, [imageUrl]);

  return { imgError, loading };
};

export default useImageLoad;
