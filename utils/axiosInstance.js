import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});

// Request interceptor to add access token
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(newToken => {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ⚡ Use separate instance for refresh
        const refreshApi = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_URL,
          withCredentials: true
        });

        const res = await refreshApi.post("/api/v1/users/refreshtoken");

        if (!res || res.status !== 200 || !res.data.accessToken) {
          throw new Error("Refresh token invalid");
        }

        const newToken = res.data.accessToken;
        localStorage.setItem("token", newToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return api(originalRequest);

      } catch (err) {
        console.error("Refresh token failed", err);
        processQueue(err, null);

        // ⚡ Logout with separate instance
        try {
          const logoutApi = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            withCredentials: true
          });
          await logoutApi.post("/api/v1/users/logout");
        } catch (e) {
          console.error("Logout failed", e);
        }

        // Clear frontend
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
        return Promise.reject(err);

      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
