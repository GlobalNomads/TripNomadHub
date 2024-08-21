// 체험 이미지 등록 API
// TanStack Query의 useMutation 적용

"use client";

import { ActivitiesImageUrl } from "@/types/activities.type";
import fetchInstance from "@/utils/fetchInstance";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// 이미지 업로드 API 함수
export const postActivitiesImg = async (activityImage: File): Promise<ActivitiesImageUrl> => {
  const formData = new FormData();
  formData.append("image", activityImage);

  try {
    const data: ActivitiesImageUrl = await fetchInstance<ActivitiesImageUrl>("activities/image", {
      method: "POST",
      body: formData,
      isMultipart: true,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "image failed");
    } else {
      throw new Error("image failed");
    }
  }
};

// `useImageUpload` 훅 정의
export const useImageUpload = (
  handleError: (error: Error) => void,
): UseMutationResult<ActivitiesImageUrl, Error, File> => {
  return useMutation<ActivitiesImageUrl, Error, File>({
    mutationFn: postActivitiesImg,
    onSuccess: (data: ActivitiesImageUrl) => {
      // 성공 시 추가적인 작업이 있다면 여기에 추가
    },
    onError: (error: Error) => {
      handleError(error);
    },
  });
};
