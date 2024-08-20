import { configureStore } from '@reduxjs/toolkit'
import playerReducer from "@/app/features/player/playerSlice";
import trackReducer from "@/app/features/tracks/trackSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      tracks: trackReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']