// slices/tracksSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "@/lib/defenitions";
import {
  loadTracks,
  loadTrackById,
  loadTracksByArtistId,
  loadTracksByAlbumId
} from './trackActions';

type TracksState = {
  tracks: Track[];
  loading: boolean;
  error: string | null;
}

const initialState: TracksState = {
  tracks: [],
  loading: false,
  error: null
};

// Общая функция для обработки ошибок
const handleError = (state: TracksState, action: any) => {
  state.loading = false;
  if ("error" in action) {
    state.error = typeof action.error.message === 'string'
      ? action.error.message
      : 'Failed to load tracks';
  }
};

// Общая функция для обновления треков
const updateTracks = (state: TracksState, tracks: Track[]) => {
  tracks.forEach(newTrack => {
    const existingTrackIndex = state.tracks.findIndex(
      track => track._id === newTrack._id
    );

    if (existingTrackIndex !== -1) {
      state.tracks[existingTrackIndex] = {
        ...state.tracks[existingTrackIndex],
        ...newTrack
      };
    } else {
      state.tracks.push(newTrack);
    }
  });
  state.loading = false;
};

const tracksSlice = createSlice<TracksState, {}>({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // loadTracks
    builder
    .addCase(loadTracks.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTracks.fulfilled, (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
      state.loading = false;
    })
    .addCase(loadTracks.rejected, handleError)

    // loadTrackById
    .addCase(loadTrackById.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTrackById.fulfilled, (state, action: PayloadAction<Track>) => {
      updateTracks(state, [action.payload]);
    })
    .addCase(loadTrackById.rejected, handleError)

    // loadTracksByArtistId
    .addCase(loadTracksByArtistId.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTracksByArtistId.fulfilled, (state, action: PayloadAction<Track[]>) => {
      updateTracks(state, action.payload);
    })
    .addCase(loadTracksByArtistId.rejected, handleError)

    // loadTracksByAlbumId
    .addCase(loadTracksByAlbumId.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTracksByAlbumId.fulfilled, (state, action: PayloadAction<Track[]>) => {
      updateTracks(state, action.payload);
    })
    .addCase(loadTracksByAlbumId.rejected, handleError);
  }
});

export default tracksSlice.reducer;