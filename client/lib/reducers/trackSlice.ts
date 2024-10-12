import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "@/lib/defenitions";
import { fetchTrackById, fetchTracks } from "@/app/services/tracksService";
import { RootState } from "@/lib/store";

interface FetchTracksParams {
  limit?: number;
  offset?: number;
}

export const loadTracks = createAsyncThunk<Track[], FetchTracksParams>(
  'tracks/loadTracks',
  async({limit, offset}: FetchTracksParams) => {
    return fetchTracks(limit, offset);
  }
);

export const loadTrackById = createAsyncThunk<Track, string, {state: RootState}>(
  'tracks/loadTrackById',
  async(id: string, {getState}) => {
    const state = getState();

    const existingTrack = state.tracks.tracks.find(track => track._id === id);
    if (existingTrack) return existingTrack;

    return await fetchTrackById(id);
  }
);

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

const tracksSlice = createSlice<TracksState, {}>({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadTracks.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTracks.fulfilled, (state, action: PayloadAction<Track[]>) => {
      state.tracks = action.payload;
      state.loading = false;
    })
    .addCase(loadTracks.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load tracks';
        }
      }
    })
    .addCase(loadTrackById.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTrackById.fulfilled, (state, action: PayloadAction<Track>) => {
      const index = state.tracks.findIndex(track => track._id === action.payload._id);
      if (index !== -1) {
        state.tracks[index] = action.payload;
      } else {
        state.tracks.push(action.payload);
      }
      state.loading = false;
    })
    .addCase(loadTrackById.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load track';
        }
      }
    });
  }
});

export default tracksSlice.reducer;