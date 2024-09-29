import { configureStore } from '@reduxjs/toolkit'
import playerReducer from "@/lib/reducers/playerSlice";
import trackReducer from "@/lib/reducers/trackSlice";
import authReducer from "@/lib/reducers/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      tracks: trackReducer,
      auth: authReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']