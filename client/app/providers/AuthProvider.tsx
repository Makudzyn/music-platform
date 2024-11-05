'use client';

import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAuthState } from "@/lib/hooks/hooks";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/lib/defenitions";
import { loginSuccess, logout } from "@/lib/redux/userReducer/userSlice";
import { loadCurrentUser } from "@/lib/redux/userReducer/userActions";
import { isTokenExpired } from "@/lib/utils";
import { refreshAccessToken } from "@/app/services/authService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuthState();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getCookie('accessToken');

      if (accessToken && !isAuthenticated && !user) {
        try {
          // Декодируем токен для получения базовой информации
          const decoded: DecodedToken = jwtDecode(accessToken);

          if (isTokenExpired(decoded)) {
            // Если токен истек, инициируем запрос на его обновление
            await refreshAccessToken();
          } else {
            const userData = {
              "_id": decoded.sub,
              ...decoded
            };

            // Устанавливаем базовую информацию из токена
            dispatch(loginSuccess(userData));

            // Загружаем полные данные пользователя
            dispatch(loadCurrentUser(userData._id));
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          dispatch(logout())
        }
      }
    };

    initializeAuth();
  }, [dispatch, isAuthenticated, user]);


  return <>{children}</>;
}