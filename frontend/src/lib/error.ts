import { AxiosError } from "axios";

/**
 * Extracts a human-readable message from an API error.
 * Backend errors are shaped as `{ status, message }`.
 */
export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong",
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;

    // No response at all means the request never completed — a wrong API base
    // URL, the backend being unreachable, or the browser blocking it on CORS.
    // Saying so beats the generic fallback, which gives no clue at all.
    if (!error.response) {
      return "Could not reach the server. Check your connection and try again.";
    }

    return `${fallback} (server responded ${error.response.status})`;
  }

  return fallback;
}
