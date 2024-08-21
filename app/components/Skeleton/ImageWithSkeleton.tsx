/*
 * ImageWithSkeleton: 이미지가 로딩되는 동안 'SkeletonBox'를 표시하고, 로딩이 완료되면 실제 이미지를 보여주는 클라이언트 컴포넌트
 */

"use client";

import useImageLoad from "@hooks/useImageLoad";
import Image, { StaticImageData } from "next/image";
import React from "react";
import SkeletonBox from "./SkeletonBox";

interface ImageWithSkeletonProps {
  imageUrl: string | StaticImageData;
  alt: string;
  width?: string;
  height?: string;
  priority?: boolean;
  className?: string;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  imageUrl,
  alt,
  width = "100%",
  height = "100%",
  priority = false,
  className = "",
  ...rest
}) => {
  const { imgError, loading } = useImageLoad(imageUrl);

  return (
    <div style={{ width, height, position: "relative" }}>
      {loading && <SkeletonBox width={width} height={height} />}
      {!imgError && (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover ${className}`}
          onLoad={() => {}}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          {...rest}
        />
      )}
      {imgError && <p className="text-red-500">Error loading image</p>}
    </div>
  );
};

export default ImageWithSkeleton;
