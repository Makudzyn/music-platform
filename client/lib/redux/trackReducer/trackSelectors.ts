import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

// Базовые селекторы
const selectTracks = (state: RootState) => state.tracks.tracks;
const selectLoading = (state: RootState) => state.tracks.loading;
const selectError = (state: RootState) => state.tracks.error;

// Селектор для получения данных о треке с состоянием загрузки
export const makeSelectTrackViewData = (trackId: string) =>
  createSelector(
    [selectTracks, selectLoading, selectError],
    (tracks, loading, error) => ({
      track: tracks.find(track => track._id === trackId),
      loading,
      error
    })
  );

// Селектор для получения треков по artistId
export const makeSelectTracksByArtistId = (artistId: string) =>
  createSelector(
    [selectTracks, selectLoading, selectError],
    (tracks, loading, error) => ({
      tracks: tracks.filter(track => track.artist._id === artistId),
      loading,
      error
    })
  );

// Селектор для получения треков по albumId
export const makeSelectTracksByAlbumId = (albumId: string) =>
  createSelector(
    [selectTracks, selectLoading, selectError],
    (tracks, loading, error) => ({
      tracks: tracks.filter(track => track.album._id === albumId),
      loading,
      error
    })
  );