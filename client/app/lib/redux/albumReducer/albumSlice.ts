import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { Playlist } from '@lib/defenitions';
import {
  loadAlbums,
  loadAlbumById,
  loadAlbumsByArtistId,
} from './albumActions';

interface AlbumsState {
  albums: Playlist[];
  loading: boolean;
  error: string | null;
}

const initialState: AlbumsState = {
  albums: [],
  loading: false,
  error: null,
};

// General function for error handling
const handleError = (state: AlbumsState, action: any) => {
  state.loading = false;
  if ('error' in action) {
    state.error =
      typeof action.error.message === 'string'
        ? action.error.message
        : 'Failed to load albums';
  }
};

// General function for updating albums
const updateAlbums = (state: AlbumsState, albums: Playlist | Playlist[]) => {
  const albumsArray = Array.isArray(albums) ? albums : [albums];

  albumsArray.forEach((newAlbum) => {
    const existingAlbumIndex = state.albums.findIndex(
      (album) => album._id === newAlbum._id,
    );

    if (existingAlbumIndex !== -1) {
      state.albums[existingAlbumIndex] = {
        ...state.albums[existingAlbumIndex],
        ...newAlbum,
      };
    } else {
      state.albums.push(newAlbum);
    }
  });
  state.loading = false;
};

const albumSlice = createSlice<
  AlbumsState, // State type
  {}, // Reducers
  'albums', // Slice name
  {} // Selector`s types
>({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // loadAlbums
      .addCase(loadAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAlbums.fulfilled, (state, { payload }) => {
        state.albums = payload;
        state.loading = false;
      })
      .addCase(loadAlbums.rejected, handleError)

      // loadAlbumById
      .addCase(loadAlbumById.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAlbumById.fulfilled, (state, { payload }) => {
        updateAlbums(state, payload);
      })
      .addCase(loadAlbumById.rejected, handleError)

      // loadAlbumsByArtistId
      .addCase(loadAlbumsByArtistId.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAlbumsByArtistId.fulfilled, (state, { payload }) => {
        updateAlbums(state, payload);
      })
      .addCase(loadAlbumsByArtistId.rejected, handleError);
  },
});

export default albumSlice.reducer;
