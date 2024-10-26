import { createAsyncThunk } from "@reduxjs/toolkit";
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
