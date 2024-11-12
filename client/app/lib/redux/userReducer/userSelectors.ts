import { RootState } from '@lib/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentUser = (state: RootState) =>
  state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
const selectUsers = (state: RootState) => state.user.users;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Selector to retrieve track data with load status
export const makeSelectUserProfileData = (userId: string) =>
  createSelector(
    [selectUsers, selectUserLoading, selectUserError],
    (users, loading, error) => ({
      user: users.find((user) => user._id === userId),
      loading,
      error,
    }),
  );
