/*
 * SkeletonBox: 로딩 중심을 시각적으로 보여주는 간단한 Skeleton UI
 */

import React from "react";

interface SkeletonBoxProps {
  width: string;
  height: string;
  className?: string;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ width, height, className = "", ...rest }) => {
  return <div className={`animate-pulse bg-gray-300 ${className}`} style={{ width, height }} />;
};

export default SkeletonBox;
