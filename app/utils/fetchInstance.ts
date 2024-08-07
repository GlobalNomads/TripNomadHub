"use server";

import postTokens from "@api/Auth/postTokens";
import { cookies } from "next/headers";
import createParams from "./createParams";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// 헤더 정보 가져오기
const getDefaultHeaders = (isMultipart: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  const token = cookies().get("accessToken");
  if (token) {
    headers.Authorization = `Bearer ${token.value}`;
  }

  return headers;
};

const createQueryString = (url: string, params?: Record<string, string | number>): string =>
  params ? `${url}?${createParams(params)}` : url;

// 메인 함수: 전체적인 fetch 로직을 관리
const fetchInstance = async <T>(
  url: string,
  options: RequestInit & { params?: Record<string, string | number>; isMultipart?: boolean } = {},
  onError?: (error: unknown) => Error,
): Promise<T> => {
  const queryString = createQueryString(url, options.params);
  const fullUrl = `${baseUrl}${queryString}`;

  try {
    // fetch 로직을 별도 함수로 분리하여 재사용성 향상
    const response = await performFetch(fullUrl, options);
    // 응답 처리 로직을 별도 함수로 분리하여 책임 분리
    return await handleResponse<T>(response, fullUrl, options);
  } catch (error) {
    // 에러 생성을 일관된 방식으로 처리 or, 에러 처리를 핸들러를 받아 사용
    if (onError) {
      throw onError(error);
    } else {
      throw createError(error);
    }
  }
};

// fetch 호출을 위한 별도 함수 생성으로 중복 제거 및 재사용성 향상
const performFetch = async (url: string, options: RequestInit & { isMultipart?: boolean }): Promise<Response> => {
  const headers = new Headers({
    ...getDefaultHeaders(options.isMultipart),
    ...options.headers,
  });

  return fetch(url, { ...options, headers });
};

// 응답 처리 로직을 별도 함수로 분리하여 메인 함수의 복잡도 감소
const handleResponse = async <T>(
  response: Response,
  url: string,
  options: RequestInit & { isMultipart?: boolean },
): Promise<T> => {
  if (response.ok) {
    return response.json();
  }

  // 401 에러 처리를 별도 함수로 분리하여 코드 가독성 향상
  if (response.status === 401) {
    return handleUnauthorized<T>(url, options);
  }

  // 에러 처리 로직 개선
  const error = await response.json().catch(() => ({ message: "Unknown error" }));
  throw new Error(error.message || "Request failed");
};

// 401 Unauthorized 에러 처리를 위한 별도 함수
const handleUnauthorized = async <T>(url: string, options: RequestInit & { isMultipart?: boolean }): Promise<T> => {
  const refreshTokenCookie = cookies().get("refreshToken");
  if (!refreshTokenCookie) {
    throw new Error("Unauthorized: No refresh token available");
  }

  try {
    await postTokens();
    // 토큰 갱신 후 재시도 로직에서 performFetch 함수 재사용
    const retryResponse = await performFetch(url, options);
    if (retryResponse.ok) {
      return retryResponse.json();
    }
    throw new Error("Failed to refresh token");
  } catch (error) {
    throw createError(error);
  }
};

// 일관된 에러 생성을 위한 헬퍼 함수
const createError = (error: unknown): Error => {
  return new Error(error instanceof Error ? error.message : "Request failed");
};

export default fetchInstance;
