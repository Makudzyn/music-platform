import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

// Базовые селекторы
const selectArtists = (state: RootState) => state.artists.artists;
const selectLoading = (state: RootState) => state.artists.loading;
const selectError = (state: RootState) => state.artists.error;

// Селектор для получения данных об альбоме с состоянием загрузки
export const makeSelectArtistViewData = (artistId: string) =>
  createSelector(
    [selectArtists, selectLoading, selectError],
    (artists, loading, error) => ({
      artist: artists.find(artist => artist._id === artistId),
      loading,
      error
    })
  );
