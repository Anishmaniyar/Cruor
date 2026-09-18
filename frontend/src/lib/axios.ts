import axios from "axios";

const TOKEN_KEY = "vital-drops-access-token";

// The API origin comes from the environment so the same build works locally and
// in production. NEXT_PUBLIC_* values are inlined at BUILD time, so this must be
// set in the Vercel project's Environment Variables and the project must be
// redeployed before a change takes effect.
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  // Failing loudly here is deliberate. Without this warning the baseURL silently
  // becomes the literal string "undefined/api/v1", every request 404s against the
  // frontend's own domain, and NOTHING shows up in the backend logs because the
  // request never reaches the API.
  console.error(
    "[api] NEXT_PUBLIC_API_URL is not set — all API requests will fail. " +
      "Set it in frontend/.env.local for local development, and in Vercel " +
      "(Project → Settings → Environment Variables) for Production, Preview and " +
      "Development, then redeploy. Expected value: http://localhost:8000 locally, " +
      "https://<your-backend-host> in production — no trailing slash, no /api/v1.",
  );
}

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

// Attach the stored access token to every request.
// The backend reads the token from the `Authorization: Bearer` header.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    const method = originalRequest?.method?.toUpperCase() ?? "REQUEST";
    const url = `${originalRequest?.baseURL ?? ""}${originalRequest?.url ?? ""}`;

    if (!error.response) {
      // The request never produced a response. The usual causes are a wrong or
      // missing NEXT_PUBLIC_API_URL, the backend being down, or the browser
      // blocking the call on CORS. The backend logs cannot show any of these
      // because the request either went elsewhere or was stopped in the browser,
      // so it is surfaced loudly here instead.
      console.error(
        `[api] ${method} ${url} received no response (${error.message}). ` +
          "Check NEXT_PUBLIC_API_URL, that the backend is running, and the " +
          "browser's Network tab for a CORS or blocked-request error.",
      );
    } else {
      console.error(
        `[api] ${method} ${url} failed with ${error.response.status}: ` +
          `${(error.response.data as { message?: string })?.message ?? "no message"}`,
      );
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/auth/refresh");

        // Backend returns the new access token in the refresh response body.
        const newToken =
          refreshResponse.data?.data?.accessToken ??
          refreshResponse.data?.accessToken;

        if (newToken) {
          window.localStorage.setItem(TOKEN_KEY, newToken);
        }

        return api(originalRequest);
      } catch (refreshError) {
        // This redirect is why a failed action can look like "it just sent me to
        // the login page". Log it so the reason is visible in the browser console.
        console.error(
          "[api] Token refresh failed — redirecting to login. The session " +
            "expired, or the refresh cookie was not sent (check the Network tab " +
            "for the /auth/refresh request).",
          refreshError,
        );
        window.location.href = window.location.pathname.startsWith("/hospital")
          ? "/hospital/login"
          : "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
