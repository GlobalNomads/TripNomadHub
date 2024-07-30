import cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

const FetchApi = async (url: string, options: FetchOptions = {}): Promise<any> => {
  const token = cookies.get("accessToken");

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fetchOptions: FetchOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const response = await fetch(fullUrl, fetchOptions);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export default FetchApi;
