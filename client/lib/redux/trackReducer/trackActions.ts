import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '@/lib/defenitions';
import {
  fetchTrackById,
  fetchTracks,
  fetchTracksByAlbumId,
  fetchTracksByArtistId,
} from '@/app/services/tracksService';
import { RootState } from '@/lib/store';
import { createLoadThunk } from '@/lib/utils';

export const loadTracks = createAsyncThunk<Track[], string>(
  'tracks/loadTracks',
  async (limit: string) => {
    return fetchTracks(limit);
  },
);

export const loadTrackById = createAsyncThunk<
  Track,
  string,
  { state: RootState }
>('tracks/loadTrackById', async (id: string, { getState }) => {
  const state = getState();
  const existingTrack = state.tracks.tracks.find((track) => track._id === id);
  if (existingTrack) return existingTrack;
  return await fetchTrackById(id);
});

// Using base function for similar thunks
export const loadTracksByArtistId = createLoadThunk(
  'tracks/loadTracksByArtistId',
  fetchTracksByArtistId,
);

export const loadTracksByAlbumId = createLoadThunk(
  'tracks/loadTracksByAlbumId',
  fetchTracksByAlbumId,
);
