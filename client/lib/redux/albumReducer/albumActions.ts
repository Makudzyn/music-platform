// actions/albumActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Playlist } from "@/lib/defenitions";
import {
  fetchAlbumById,
  fetchAlbums,
  fetchAlbumsByArtistId
} from "@/app/services/albumService";
import { RootState } from "@/lib/store";
import { createLoadThunk } from "@/lib/utils";

export const loadAlbums = createAsyncThunk<Playlist[], string>(
  'albums/loadAlbums',
  async (limit?: string) => {
    return fetchAlbums(limit);
  }
);

export const loadAlbumById = createAsyncThunk<Playlist, string, {state: RootState}>(
  'albums/loadAlbumById',
  async (albumId: string, { getState }) => {
    const state = getState();
    const existingAlbum = state.albums.albums.find(album => album._id === albumId);
    if (existingAlbum) {
      return existingAlbum;
    }
    return await fetchAlbumById(albumId);
  }
);

// Используем базовую функцию для создания thunk'а
export const loadAlbumsByArtistId = createLoadThunk(
  'albums/loadAlbumsByArtistId',
  fetchAlbumsByArtistId
);