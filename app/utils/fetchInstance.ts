"use server";

import postRefreshToken from "@api/postRefreshToken";
import { cookies } from "next/headers";
import createParams from "./createParams";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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

const fetchInstance = async <T>(
  url: string,
  options: RequestInit & { params?: Record<string, string | number>; isMultipart?: boolean } = {},
): Promise<T> => {
  const defaultHeaders = getDefaultHeaders(options.isMultipart);

  const headers = new Headers({
    ...defaultHeaders,
    ...options.headers,
  });

  const queryString = createQueryString(url, options.params);

  try {
    const response: Response = await fetch(`${baseUrl}${queryString}`, {
      ...options,
      headers,
    });

    // interceptor
    if (!response.ok) {
      if (response.status === 401) {
        const refreshTokenCookie = cookies().get("refreshToken");
        if (refreshTokenCookie) {
          try {
            const newAccessToken = await postRefreshToken();
            headers.set("Authorization", `Bearer ${newAccessToken.accessToken}`);
            // const retryHeaders = getDefaultHeaders(options.isMultipart);
            const retryResponse: Response = await fetch(`${baseUrl}${queryString}`, {
              ...options,
              // headers: new Headers({
              //   ...retryHeaders,
              //   ...options.headers,
              headers,
            });
            if (retryResponse.ok) {
              return retryResponse.json();
            }
          } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to refresh token");
          }
        }

        throw new Error("Unauthorized: No refresh token available");
      } else {
        const error = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(error.message || "Request failed");
      }
    }

    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Request failed");
  }
};

export default fetchInstance;
