import { queryClient } from "../main";

export const authenticatedFetch = async(
  url: string,
  options: RequestInit = {},
): Promise<any> => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  let data;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  // Handle Unauthorized
  if (response.status === 401) {
    queryClient.clear();

    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }

    throw new Error(
      data?.message || "Session expired"
    );
  }

  // Handle Other Errors
  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
};