import axiosClient from "@/lib/axiosClient";
import { getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/redux/userReducer/userSlice";
import { DecodedToken } from "@/lib/defenitions";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authenticate = async(formData: Object): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post(`/auth/login`, formData);
    return response.data
  } catch (error) {
    console.error("Authentication error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error during authentication');
  }
}

export const useAuthenticate = () => {
  const dispatch = useDispatch();

  const login = async (formData: Object) => {
    const data = await authenticate(formData);

    if (data) {
      const decoded: DecodedToken = jwtDecode(data.accessToken);
      const userData = {
        "_id": decoded.sub,
        "username": decoded.username,
        "role": decoded.role
      };

      // Установка access и refresh токенов в куки
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      // Сохранение роли в глобальном состоянии
      dispatch(loginSuccess(userData));
    }
  };

  return { login };
};

export const registration = async (formData: Object) => {
  try {
    const response = await axiosClient.post(`/auth/register`, formData);
    return response.data
  } catch (error) {
    console.error("Registration error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error during registration');
  }
}

export const emailConfirmation = async (token: string) => {
  try {
    return await axiosClient.get(`/auth/confirm-email?token=${token}`)
  } catch (error) {
    console.error("Email confirmation error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error during email confirmation');
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    throw new Error("Refresh token is missing");
  }
  try {
    const response = await axiosClient.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data;
    setCookie('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error during token refresh');
  }
}