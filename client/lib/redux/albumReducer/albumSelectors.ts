import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

// Базовые селекторы
const selectAlbums = (state: RootState) => state.albums.albums;
const selectLoading = (state: RootState) => state.albums.loading;
const selectError = (state: RootState) => state.albums.error;

// Селектор для получения данных об альбоме с состоянием загрузки
export const makeSelectAlbumViewData = (albumId: string) =>
  createSelector(
    [selectAlbums, selectLoading, selectError],
    (albums, loading, error) => ({
      album: albums.find(album => album._id === albumId),
      loading,
      error
    })
  );

// Селектор для получения альбомов по artistId
export const makeSelectAlbumsByArtistId = (artistId: string) =>
  createSelector(
    [selectAlbums, selectLoading, selectError],
    (albums, loading, error) => ({
      albums: albums.filter(album => album.artist._id === artistId),
      loading,
      error
    })
  );