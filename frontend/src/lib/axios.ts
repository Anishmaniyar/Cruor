import axios from "axios";

const TOKEN_KEY = "vital-drops-access-token";

// The API origin comes from the environment so the same build works locally
// and in production. The backend mounts all routes under `/api/v1`.
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
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
