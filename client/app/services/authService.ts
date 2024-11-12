import axiosClient from '@lib/axiosClient';
import { getCookie, setCookie } from 'cookies-next';
import { useAppDispatch } from '@hooks/hooks';
import { DecodedToken } from '@lib/defenitions';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess } from '@lib/redux/userReducer/userSlice';
import { loadCurrentUser } from '@lib/redux/userReducer/userActions';
import { AxiosError } from "axios";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authenticate = async (
  formData: object,
): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post(`/auth/login`, formData);
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error during authentication';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const useAuthenticate = () => {
  const dispatch = useAppDispatch();

  const login = async (formData: object) => {
    const data = await authenticate(formData);

    if (data) {
      const decoded: DecodedToken = jwtDecode(data.accessToken);
      const userData = {
        _id: decoded.sub,
        ...decoded,
      };

      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);

      // Set the base data from the token and load the full user data
      dispatch(loginSuccess(userData));
      dispatch(loadCurrentUser(userData._id));
    }
  };

  return { login };
};

export const registration = async (formData: object) => {
  try {
    const response = await axiosClient.post(`/auth/register`, formData);
    return response.data;
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error during registration';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const emailConfirmation = async (token: string) => {
  try {
    return await axiosClient.get(`/auth/confirm-email?token=${token}`);
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error during email confirmation';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token is missing');
  }
  try {
    const response = await axiosClient.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data;
    setCookie('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    let errorMessage;
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message ||
        error.message ||
        'Error during token refresh';
    } else errorMessage = 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};
