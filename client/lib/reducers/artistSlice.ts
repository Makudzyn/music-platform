import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "@/lib/defenitions";
import { fetchArtistById, fetchArtists } from "@/app/services/artistService";
import { RootState } from "@/lib/store";

export const loadArtists = createAsyncThunk<Artist[], string>(
  'artists/loadArtists',
  async(limit: string) => {
    return fetchArtists(limit);
  }
);

export const loadArtistById = createAsyncThunk<Artist, string, {state: RootState}>(
  'artists/loadArtistById',
  async(artistId: string, {getState}) => {
    const state = getState();
    const existingArtist = state.artists.artists.find(artist => artist._id === artistId);

    if (existingArtist) {
      return existingArtist;
    }
    return await fetchArtistById(artistId)
  }
)

export const makeSelectArtistById = (artistId: string) =>
  createSelector(
    [
      (state: RootState) => state.artists.artists,
      (state: RootState) => state.artists.loading,
      (state: RootState) => state.artists.error
    ],
    (artists, loading, error) => ({
      artist: artists.find(artist => artist._id === artistId),
      loading,
      error
    })
  );

export const makeSelectAlbumsByArtistId = (artistId: string) =>
  createSelector(
    [
      (state: RootState) => state.albums.albums,
      (state: RootState) => state.albums.loading,
      (state: RootState) => state.albums.error
    ],
    (albums, loading, error) => ({
      albums: albums.filter(album => album.artist._id === artistId),
      loading,
      error
    })
  );

export const makeSelectTracksByArtistId = (artistId: string) =>
  createSelector(
    [
      (state: RootState) => state.tracks.tracks,
      (state: RootState) => state.tracks.loading,
      (state: RootState) => state.tracks.error
    ],
    (tracks, loading, error) => ({
      tracks: tracks.filter(track => track.artist._id === artistId),
      loading,
      error
    })
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
  extraReducers: (builder) => {
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
    .addCase(loadArtistById.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadArtistById.fulfilled, (state, action: PayloadAction<Artist>) => {
      const index = state.artists.findIndex(artist => artist._id === action.payload._id);
      if (index !== -1) {
        // Обновляем существующий альбом, сохраняя полную информацию о треках
        state.artists[index] = {
          ...state.artists[index],
          ...action.payload
        };
      } else {
        state.artists.push(action.payload);
      }
      state.loading = false;
    })
    .addCase(loadArtistById.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load album';
        }
      }
    });
  }
})

export default artistSlice.reducer;