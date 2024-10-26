import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Artist } from "@/lib/defenitions";
import { loadArtistById, loadArtists } from "@/lib/redux/artistReducer/artistActions";


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

// Общая функция для обработки ошибок
const handleError = (state: ArtistsState, action: any) => {
  state.loading = false;
  if ("error" in action) {
    state.error = typeof action.error.message === 'string'
      ? action.error.message
      : 'Failed to load artists';
  }
};

const artistSlice = createSlice<ArtistsState, {}>({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //loadArtists
    builder
    .addCase(loadArtists.pending, (state) => {
      state.loading = true;
    })
    .addCase(loadArtists.fulfilled, (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
      state.loading = false;
    })
    .addCase(loadArtists.rejected, handleError)

    //loadArtistById
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
    .addCase(loadArtistById.rejected, handleError)
  }
})

export default artistSlice.reducer;