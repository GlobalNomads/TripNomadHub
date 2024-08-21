/*
 * useImageLoad: 이미지 로딩 상태를 관리하는 훅.
 */

"use client";

import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const useImageLoad = (imageUrl?: string | StaticImageData | null) => {
  const [imgError, setImgError] = useState<boolean | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!imageUrl) {
      setImgError(true);
      setLoading(false);
      return;
    }

    const imgSrc = typeof imageUrl === "string" ? imageUrl : imageUrl.src;

    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
      setImgError(false);
      setLoading(false);
    };

    img.onerror = () => {
      setImgError(true);
      setLoading(false);
    };
  }, [imageUrl]);

  return { imgError, loading };
};

export default useImageLoad;
