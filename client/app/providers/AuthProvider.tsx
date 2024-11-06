'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAuthState } from '@/lib/hooks/hooks';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/lib/defenitions';
import { loginSuccess, logout } from '@/lib/redux/userReducer/userSlice';
import { loadCurrentUser } from '@/lib/redux/userReducer/userActions';
import { isTokenExpired } from '@/lib/utils';
import { refreshAccessToken } from '@/app/services/authService';

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAuthState();

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getCookie('accessToken');

      if (accessToken && !isAuthenticated && !user) {
        try {
          // Decode token to get basic information
          const decoded: DecodedToken = jwtDecode(accessToken);

          if (isTokenExpired(decoded)) {
            // If the token has expired, initiate a request to renew it
            await refreshAccessToken();
          } else {
            const userData = {
              _id: decoded.sub,
              ...decoded,
            };

            // Set the basic information from the token
            dispatch(loginSuccess(userData));

            // Load full user data
            dispatch(loadCurrentUser(userData._id));
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          dispatch(logout());
        }
      }
    };

    initializeAuth();
  }, [dispatch, isAuthenticated, user]);

  return <>{children}</>;
}
