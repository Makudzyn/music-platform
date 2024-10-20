import { RepeatMode, Track } from "@/lib/defenitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shuffleArray } from "@/lib/utils";

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[] | null;
  qIndex: number;
  shuffle: boolean;
  volume: number;
  totalDuration: number;
  currentPosition: number;
  paused: boolean;
  repeatMode: RepeatMode;
}

const initialState: PlayerState = {
  currentTrack: null,
  queue: [],
  qIndex: 0,
  shuffle: false,
  volume: 25,
  totalDuration: 0,
  currentPosition: 0,
  paused: true,
  repeatMode: "none",
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
    nextTrack(state) {
      if (state.repeatMode === "one") { // Repeat the current track
        state.currentPosition = 0;
      } else if (state.repeatMode === "all") { // Move to the next track, or loop to the start if at the end of the queue
        state.queueIndex = (state.queueIndex + 1) % state.queue.length;
        state.currentTrack = state.queue[state.queueIndex];
      } else { // Standard mode, move to the next track or pause if at the end
        if (state.queueIndex < state.queue.length - 1) {
          state.queueIndex += 1;
          state.currentTrack = state.queue[state.queueIndex];
        } else {
          state.paused = true;
        }
      }
    },
    previousTrack(state) {
      if (state.queueIndex > 0) {
        state.queueIndex -= 1;
        state.currentTrack = state.queue[state.queueIndex];
      }
    },
    toggleShuffle(state) {
      state.shuffle = !state.shuffle;
      if (state.shuffle) { // Shuffle the queue and reset the current track index
        state.queue = shuffleArray(state.queue);
        state.queueIndex = 0;
        state.currentTrack = state.queue[0];
      } else {
        // TODO: Implement a way to restore the original order
      }
    },
    setQueue(state, action: PayloadAction<Track[]>) {
      state.queue = action.payload;
      state.queueIndex = 0;
    },
    setCurrentTrack(state, action: PayloadAction<Track | null>) {
      const selectedTrack = action.payload;
      state.currentTrack = selectedTrack;
      if (selectedTrack && state.queue) {
        // Находим индекс выбранного трека в очереди
        const trackIndex = state.queue.findIndex(track => track._id === selectedTrack._id);

        // Если найден, обновляем индекс очереди
        if (trackIndex !== -1) {
          state.queueIndex = trackIndex;
        }
      }
      state.currentPosition = 0;
      state.paused = !selectedTrack;
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
  play, pause, setCurrentTrack,
  setQueue,
  nextTrack, previousTrack,
  toggleShuffle, setRepeatMode,
  setVolume, setTotalDuration, setCurrentPosition
} = playerSlice.actions;


export default playerSlice.reducer;