// Базовые селекторы
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { User } from "@/lib/defenitions";

export const selectCurrentUser = (state: RootState): User => state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
const selectUsers = (state: RootState) => state.user.users;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Селектор для получения данных о треке с состоянием загрузки
export const makeSelectUserProfileData = (userId: string) =>
  createSelector(
    [selectUsers, selectUserLoading, selectUserError],
    (users, loading, error) => ({
      user: users.find(user => user._id === userId),
      loading,
      error
    })
  );
