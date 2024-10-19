import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playlist } from "@/lib/defenitions";
import { fetchAlbumById, fetchAlbums, fetchAlbumTracks } from "@/app/services/albumService";
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
    if (existingAlbum && existingAlbum.tracks.length > 0 && existingAlbum.tracks.every(track => track.audio)) {
      return existingAlbum;
    }
    const album = await fetchAlbumById(albumId);
    const tracks = await fetchAlbumTracks(albumId);
    return {...album, tracks};
  }
)

export const makeSelectAlbumViewData = (albumId: string) =>
  createSelector([
    (state: RootState) => state.albums.albums,
    (state: RootState) => state.albums.loading,
    (state: RootState) => state.albums.error,
    ],
    (albums, loading, error) => {
      const album = albums.find(album => album._id === albumId)
      return { album, tracks: album?.tracks || [], loading, error };
    }
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
      const index = state.albums.findIndex(track => track._id === action.payload._id);
      if (index !== -1) {
        state.albums[index] = {
          ...state.albums[index],
          ...action.payload,
          tracks: action.payload.tracks.map(newTrack => {
            const existingTrack = state.albums[index].tracks.find(t => t._id === newTrack._id);
            return existingTrack && existingTrack.audio ? existingTrack : newTrack;
          })
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
    });
  }
})

export default albumSlice.reducer;