import axios from 'axios';
import { getCookie } from 'cookies-next';
import { refreshAccessToken } from "@/app/services/authService";

// Создание экземпляра axios
const axiosClient = axios.create({
  baseURL: 'http://localhost:5000', // базовый URL для запросов
});

// Флаг для отслеживания состояния обновления токена
let isRefreshing = false;
let failedQueue: any[] = [];

// Функция для обработки повторного выполнения запросов после обновления токена
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Перехватчик запросов
axiosClient.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken'); // Получение access-токена из куки

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => Promise.reject(error));

// Перехватчик ответов
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401, пытаемся обновить токен
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosClient(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;


      try {
        // Отправляем запрос на обновление токена
        const newAccessToken = await refreshAccessToken();

        processQueue(null, newAccessToken);
        // Повторяем исходный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Если обновление токена не удалось, редиректим на страницу логина
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
