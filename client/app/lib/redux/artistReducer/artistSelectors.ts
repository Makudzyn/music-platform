import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@lib/store';

export const selectArtists = (state: RootState) => state.artists.artists;
export const selectArtistLoading = (state: RootState) => state.artists.loading;
const selectArtistError = (state: RootState) => state.artists.error;

// Selector to retrieve album data with download state
export const makeSelectArtistViewData = (artistId: string) =>
  createSelector(
    [selectArtists, selectArtistLoading, selectArtistError],
    (artists, loading, error) => ({
      artist: artists.find((artist) => artist._id === artistId),
      loading,
      error,
    }),
  );
