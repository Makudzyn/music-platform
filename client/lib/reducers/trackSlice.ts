import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "@/lib/defenitions";
import { fetchTrackById, fetchTracks, fetchTracksByArtistId } from "@/app/services/tracksService";
import { RootState } from "@/lib/store";


export const loadTracks = createAsyncThunk<Track[], string>(
  'tracks/loadTracks',
  async(limit: string) => {
    return fetchTracks(limit);
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

export const loadTracksByArtistId = createAsyncThunk<Track[], string>(
  'tracks/loadTracksByArtistId',
  async(artistId: string)=> {
    return await fetchTracksByArtistId(artistId);
  }
)

export const makeSelectTrackViewData = (trackId: string) =>
  createSelector([
      (state: RootState) => state.tracks.tracks,
      (state: RootState) => state.tracks.loading,
      (state: RootState) => state.tracks.error,
    ],
    (tracks, loading, error) => {
      const track = tracks.find(track => track._id === trackId)
      return { track, loading, error };
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
    })
    .addCase(loadTracksByArtistId.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadTracksByArtistId.fulfilled, (state, action: PayloadAction<Track[]>) => {
      action.payload.forEach(newTrack => {
        const existingTrackIndex = state.tracks.findIndex(track => track._id === newTrack._id);

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
    })
    .addCase(loadTracksByArtistId.rejected, (state, action) => {
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