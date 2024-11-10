import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@lib/store';

const selectArtists = (state: RootState) => state.artists.artists;
const selectLoading = (state: RootState) => state.artists.loading;
const selectError = (state: RootState) => state.artists.error;

// Selector to retrieve album data with download state
export const makeSelectArtistViewData = (artistId: string) =>
  createSelector(
    [selectArtists, selectLoading, selectError],
    (artists, loading, error) => ({
      artist: artists.find((artist) => artist._id === artistId),
      loading,
      error,
    }),
  );
