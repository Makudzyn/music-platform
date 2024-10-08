import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "@/lib/defenitions";
import { fetchArtists } from "@/app/services/artistService";

export const loadArtists = createAsyncThunk<Artist[], number>(
  'artist/loadArtists',
  async(limit: number) => {
    return fetchArtists(limit);
  }
);

type ArtistsState = {
  artists: Artist[];
  loading: boolean;
  error: string | null;
}

const initialState: ArtistsState = {
  artists: [],
  loading: false,
  error: null
}

const artistSlice = createSlice<ArtistsState, {}>({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder)=> {
    builder.addCase(loadArtists.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadArtists.fulfilled, (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
      state.loading = false;
    })
    .addCase(loadArtists.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load artists';
        }
      }
    })
  }
})

export default artistSlice.reducer;