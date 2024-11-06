import axiosClient from '@/lib/axiosClient';
import { getCookie, setCookie } from 'cookies-next';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { DecodedToken } from '@/lib/defenitions';
import { jwtDecode } from 'jwt-decode';
import { loginSuccess } from '@/lib/redux/userReducer/userSlice';
import { loadCurrentUser } from '@/lib/redux/userReducer/userActions';

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
    console.error(
      'Authentication error:',
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Error during authentication',
    );
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
    console.error(
      'Registration error:',
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Error during registration',
    );
  }
};

export const emailConfirmation = async (token: string) => {
  try {
    return await axiosClient.get(`/auth/confirm-email?token=${token}`);
  } catch (error) {
    console.error(
      'Email confirmation error:',
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Error during email confirmation',
    );
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
    console.error(
      'Error refreshing token:',
      error.response?.data?.message || error.message,
    );
    throw new Error(
      error.response?.data?.message || 'Error during token refresh',
    );
  }
};
