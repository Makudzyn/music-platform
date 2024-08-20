'use client';

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { pause, play, setRepeatMode } from "@/app/features/player/playerSlice";
import { MutableRefObject } from "react";

interface PlayerControlsProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function PlayerControls({audioRef}: PlayerControlsProps) {
  const dispatch = useAppDispatch();
  const {paused, repeatMode} = useAppSelector(state => state.player);

  const handlePlayPause = () => {
    if (paused) {
      audioRef.current?.play();
      dispatch(play())
      console.log(paused, audioRef);
    } else {
      audioRef.current?.pause();
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
  return (
    <div className="w-full h-8 gap-4 mb-2 flex flex-row justify-between items-center ">
      <div className="w-full ps-2 pe-2 flex justify-center items-center text-sub-gray">
        <div className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white">
          <SkipPreviousIcon sx={{width: 32, height: 32}}/>
        </div>
      </div>
      <div className="w-full ps-2 pe-2 flex justify-center items-center ">
        <div
          onClick={handlePlayPause}
          className="bg-white rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-100"
        >
          {paused ? <PlayArrowIcon sx={{width: 32, height: 32}}/> : <PauseIcon sx={{width: 32, height: 32}}/>}
        </div>
      </div>
      <div className="w-full ps-2 pe-2 flex justify-start items-center text-sub-gray">
        <div className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white">
          <SkipNextIcon sx={{width: 32, height: 32}}/>
        </div>
        <div
          className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white"
          onClick={handleRepeatToggle}
        >
          {repeatMode === "none" && <RepeatIcon sx={{width: 32, height: 32}}/>}
          {repeatMode === "all" && <RepeatIcon sx={{width: 32, height: 32, color: repeatMode === "all" ? "green" : "inherit"}}/>}
          {repeatMode === "one" && <RepeatOneIcon sx={{width: 32, height: 32, color: repeatMode === "one" ? "green" : "inherit"}}/>}
        </div>
      </div>
    </div>
  );
};