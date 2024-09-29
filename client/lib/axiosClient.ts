import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/lib/defenitions";
import { useDispatch } from "react-redux";
import { updateRole } from "@/lib/reducers/authSlice"; // cookies-next для работы с куки

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

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getCookie('refreshToken'); // Получение refresh-токена из куки

      if (!refreshToken) {
        // Если нет refresh-токена, редиректим на страницу логина
        window.location.href = '/auth/login';
        return Promise.reject(error);
      }

      try {
        // Отправляем запрос на обновление токена
        const response = await axios.post('http://localhost:5000/auth/refresh', { refreshToken });

        const { accessToken } = response.data;

        // Обновляем куки с новым access-токеном
        setCookie('accessToken', accessToken);

        // Обновляем роль пользователя, если нужно
        const dispatch = useDispatch();
        const decoded: DecodedToken = jwtDecode(accessToken);
        dispatch(updateRole(decoded.role));

        // Повторяем исходный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

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
