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
  }

  return fallback;
}
