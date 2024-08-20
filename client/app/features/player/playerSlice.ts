import { PlayerState, RepeatMode, Track } from "@/app/lib/defenitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: PlayerState = {
  currentTrack: null,
  volume: 25,
  totalDuration: 0,
  currentPosition: 0,
  paused: true,
  repeatMode: "none"
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    play(state) {
      state.paused = false;
    },
    pause(state) {
      state.paused = true;
    },
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      state.currentTrack = action.payload;
      state.currentPosition = 0;
      state.paused = !action.payload;
    },
    setTotalDuration(state, action: PayloadAction<number>) {
      state.totalDuration = action.payload;
    },
    setCurrentPosition(state, action: PayloadAction<number>) {
      state.currentPosition = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setRepeatMode(state, action: PayloadAction<RepeatMode>) {
      state.repeatMode = action.payload;
    }
  }
});

export const {
  play, pause,
  setCurrentTrack, setTotalDuration,
  setCurrentPosition, setVolume,
  setRepeatMode} = playerSlice.actions


export default playerSlice.reducer;