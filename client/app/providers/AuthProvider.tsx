'use client';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAuthState } from '@hooks/hooks';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@lib/defenitions';
import { logout } from '@lib/redux/userReducer/userSlice';
import { loadCurrentUser } from '@lib/redux/userReducer/userActions';
import { isTokenExpired } from '@lib/utils';
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
            // Load full user data
            dispatch(loadCurrentUser(decoded.sub));
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
