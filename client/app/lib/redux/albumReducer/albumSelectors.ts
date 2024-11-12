import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@lib/store';

export const selectAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.loading;
const selectAlbumsError = (state: RootState) => state.albums.error;

// Selector to retrieve album data with download status
export const makeSelectAlbumViewData = (albumId: string) =>
  createSelector(
    [selectAlbums, selectAlbumsLoading, selectAlbumsError],
    (albums, loading, error) => ({
      album: albums.find((album) => album._id === albumId),
      loading,
      error,
    }),
  );

// Selector to retrieve albums by artistId
export const makeSelectAlbumsByArtistId = (artistId: string) =>
  createSelector(
    [selectAlbums, selectAlbumsLoading, selectAlbumsError],
    (albums, loading, error) => ({
      albums: albums.filter((album) => album.artist._id === artistId),
      loading,
      error,
    }),
  );
