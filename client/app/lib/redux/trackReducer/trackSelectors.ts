import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@lib/store';

export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksLoading = (state: RootState) => state.tracks.loading;
const selectTracksError = (state: RootState) => state.tracks.error;

// Selector to get track data with load status
export const makeSelectTrackViewData = (trackId: string) =>
  createSelector(
    [selectTracks, selectTracksLoading, selectTracksError],
    (tracks, loading, error) => ({
      track: tracks.find((track) => track._id === trackId),
      loading,
      error,
    }),
  );

// Selector to get tracks by artistId
export const makeSelectTracksByArtistId = (artistId: string) =>
  createSelector(
    [selectTracks, selectTracksLoading, selectTracksError],
    (tracks, loading, error) => ({
      tracks: tracks.filter((track) => track.artist._id === artistId),
      loading,
      error,
    }),
  );

// Selector to get tracks by albumId
export const makeSelectTracksByAlbumId = (albumId: string) =>
  createSelector(
    [selectTracks, selectTracksLoading, selectTracksError],
    (tracks, loading, error) => ({
      tracks: tracks.filter((track) => track.album._id === albumId),
      loading,
      error,
    }),
  );
