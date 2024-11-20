import axios from 'axios';
import { getCookie } from 'cookies-next';
import { refreshAccessToken } from '@/app/services/authService';

// Creating an axios instance
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // базовый URL для запросов
});

// Flag to track token update status
let isRefreshing = false;
let failedQueue: any[] = [];

// Function to handle re-execution of requests after token update
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken'); // Получение access-токена из куки

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Answer Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401, try to update the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // Send token update request
        const newAccessToken = await refreshAccessToken();

        processQueue(null, newAccessToken);
        // Repeat the original request with a new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
