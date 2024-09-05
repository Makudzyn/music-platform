'use client';

import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import RepeatRoundedIcon from '@mui/icons-material/RepeatRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { nextTrack, pause, play, previousTrack, setRepeatMode, toggleShuffle } from "@/app/features/player/playerSlice";

export default function PlayerControls() {
  const dispatch = useAppDispatch();
  const {paused, repeatMode, shuffle} = useAppSelector(state => state.player);

  const handlePlayPause = () => {
    if (paused) {
      dispatch(play())
    } else {
      dispatch(pause())
    }
  }
  const handleRepeatToggle = () => {
    if (repeatMode === 'none') {
      dispatch(setRepeatMode("all"))
    } else if (repeatMode === 'all') {
      dispatch(setRepeatMode("one"))
    } else if (repeatMode === 'one') {
      dispatch(setRepeatMode("none"))
    }
  }
  const goToPreviousTrack = () => {
    dispatch(previousTrack())
  }
  const goToNextTrack = () => {
    dispatch(nextTrack())
  }
  const handleShuffleToggle = () => {
    dispatch(toggleShuffle())
  }
  return (
    <div className="w-full h-8 gap-4 mb-2 flex flex-row justify-between items-center">
      <div className="w-full gap-2 flex justify-end items-center text-sub-gray">
        <div
          className="cursor-pointer pe-1.5 transition-all duration-300 hover:scale-110 hover:text-white"
          onClick={handleShuffleToggle}
        >
          <ShuffleRoundedIcon sx={{width: 28, height: 28, color: shuffle ? "green" : "inherit"}}/>
        </div>
        <div
          className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white"
          onClick={goToPreviousTrack}
        >
          <SkipPreviousRoundedIcon sx={{width: 32, height: 32}}/>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div
          onClick={handlePlayPause}
          className="bg-white rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-100"
        >
          {paused ?
            <PlayArrowRoundedIcon sx={{width: 32, height: 32, color: "black"}} /> :
            <PauseRoundedIcon sx={{width: 32, height: 32, color: "black"}} />
          }
        </div>
      </div>
      <div className="w-full gap-2 flex justify-start items-center text-sub-gray">
        <div
          className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white"
          onClick={goToNextTrack}
        >
          <SkipNextRoundedIcon sx={{width: 32, height: 32}}/>
        </div>
        <div
          className="cursor-pointer ps-1.5 transition-all duration-300 hover:scale-110 hover:text-white"
          onClick={handleRepeatToggle}
        >
          {repeatMode === "none" && <RepeatRoundedIcon sx={{width: 28, height: 28}}/>}
          {repeatMode === "all" &&
            <RepeatRoundedIcon sx={{width: 28, height: 28, color: repeatMode === "all" ? "green" : "inherit"}}/>}
          {repeatMode === "one" &&
            <RepeatOneRoundedIcon sx={{width: 28, height: 28, color: repeatMode === "one" ? "green" : "inherit"}}/>}
        </div>
      </div>
    </div>
  );
};