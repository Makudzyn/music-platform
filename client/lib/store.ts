import { configureStore } from '@reduxjs/toolkit'
import playerReducer from "@/lib/redux/playerSlice";
import trackReducer from "@/lib/redux/trackReducer/trackSlice";
import userReducer from "@/lib/redux/userReducer/userSlice";
import albumReducer from "@/lib/redux/albumReducer/albumSlice";
import artistReducer from "@/lib/redux/artistReducer/artistSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      tracks: trackReducer,
      user: userReducer,
      albums: albumReducer,
      artists: artistReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']