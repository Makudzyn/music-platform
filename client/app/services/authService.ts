import axiosClient from "@/lib/axiosClient";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/reducers/authSlice";
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

      // Установка access и refresh токенов в куки
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      // Сохранение роли в глобальном состоянии
      dispatch(loginSuccess({role: decoded.role}));
    }
  };

  return { login };
};