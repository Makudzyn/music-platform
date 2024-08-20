import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track, TracksState } from "@/app/lib/defenitions";
import { fetchTrackById, fetchTracks } from "@/app/services/tracksService";

export const loadTracks = createAsyncThunk<Track[], void>('tracks/loadTracks', async() => {
  return fetchTracks();
});

export const loadTrackById = createAsyncThunk<Track, string>('tracks/loadTrackById', async(id: string) => {
  return await fetchTrackById(id);
});

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
      state.tracks = [action.payload];
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