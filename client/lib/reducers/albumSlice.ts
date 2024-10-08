import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album } from "@/lib/defenitions";
import { fetchAlbums } from "@/app/services/albumService";

export const loadAlbums = createAsyncThunk<Album[], number>(
  'albums/loadAlbums',
  async(limit: number) => {
    return fetchAlbums(limit);
  }
);

type AlbumsState = {
  albums: Album[];
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
  extraReducers: (builder)=> {
    builder.addCase(loadAlbums.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadAlbums.fulfilled, (state, action: PayloadAction<Album[]>) => {
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
  }
})

export default albumSlice.reducer;