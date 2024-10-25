import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playlist } from "@/lib/defenitions";
import { fetchAlbumById, fetchAlbums, fetchAlbumsByArtistId } from "@/app/services/albumService";
import { RootState } from "@/lib/store";

export const loadAlbums = createAsyncThunk<Playlist[], string>(
  'albums/loadAlbums',
  async(limit?: string) => {
    return fetchAlbums(limit);
  }
);

export const loadAlbumById = createAsyncThunk<Playlist, string, {state: RootState}>(
  'albums/loadAlbumById',
  async(albumId: string, {getState}) => {
    const state = getState();
    const existingAlbum = state.albums.albums.find(album => album._id === albumId);
    if (existingAlbum) {
      return existingAlbum;
    }
    return  await fetchAlbumById(albumId);
  }
)

export const loadAlbumsByArtistId = createAsyncThunk<Playlist[], string>(
  'albums/loadAlbumsByArtistId',
  async(artistId: string)=> {
    return await fetchAlbumsByArtistId(artistId);
  }
)

export const makeSelectAlbumViewData = (albumId: string) =>
  createSelector([
    (state: RootState) => state.albums.albums,
    (state: RootState) => state.albums.loading,
    (state: RootState) => state.albums.error,
    ],
    (albums, loading, error) => ({
      album: albums.find(album => album._id === albumId),
      loading,
      error
    })
  );

export const makeSelectTracksByAlbumId = (albumId: string) =>
  createSelector(
    [
      (state: RootState) => state.tracks.tracks,
      (state: RootState) => state.tracks.loading,
      (state: RootState) => state.tracks.error
    ],
    (tracks, loading, error) => ({
      tracks: tracks.filter(track => track.album._id === albumId),
      loading,
      error
    })
  );


type AlbumsState = {
  albums: Playlist[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumsState = {
  albums: [],
  loading: false,
  error: null
}

const albumSlice = createSlice<AlbumsState, {}>({
  name: "albums",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loadAlbums.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadAlbums.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
      state.albums = action.payload;
      state.loading = false;
    })
    .addCase(loadAlbums.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load albums';
        }
      }
    })
    .addCase(loadAlbumById.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadAlbumById.fulfilled, (state, action: PayloadAction<Playlist>) => {
      const index = state.albums.findIndex(album => album._id === action.payload._id);
      if (index !== -1) {
        state.albums[index] = {
          ...state.albums[index],
          ...action.payload,
        };
      } else {
        state.albums.push(action.payload);
      }
      state.loading = false;
    })
    .addCase(loadAlbumById.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load album';
        }
      }
    })
    .addCase(loadAlbumsByArtistId.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadAlbumsByArtistId.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
      action.payload.forEach(newAlbum => {
        const existingAlbumIndex = state.albums.findIndex(album => album._id === newAlbum._id);

        if (existingAlbumIndex !== -1) {
          state.albums[existingAlbumIndex] = {
            ...state.albums[existingAlbumIndex],
            ...newAlbum
          };
        } else {
          state.albums.push(newAlbum);
        }
      });
      state.loading = false;
    })
    .addCase(loadAlbumsByArtistId.rejected, (state, action) => {
      state.loading = false;
      if ("error" in action) {
        if (typeof action.error.message === 'string') {
          state.error = action.error.message;
        } else {
          state.error = 'Failed to load albums by artist';
        }
      }
    });
  }
})

export default albumSlice.reducer;