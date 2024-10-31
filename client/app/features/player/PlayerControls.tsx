'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { nextTrack, pause, play, previousTrack, setRepeatMode, toggleShuffle } from "@/lib/redux/playerSlice";
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react";
import PlayerButton from "@/app/features/player/PlayerButton";

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
    <div className="mb-2 flex h-8 w-full flex-row items-center justify-between gap-4 text-white">
      <div className="flex w-full items-center justify-end gap-2">
        <PlayerButton
          onClick={handleShuffleToggle}
          icon={<Shuffle/>}
          className={shuffle ? "text-accent" : "text-foreground"}
        />
        <PlayerButton onClick={goToPreviousTrack} icon={<SkipBack/>}/>
      </div>
      <div className="flex items-center justify-center">
        <div
          onClick={handlePlayPause}
          className="cursor-pointer rounded-full bg-background p-1 shadow-sm transition-all duration-300 shadow-foreground hover:scale-110 hover:shadow-accent hover:shadow"
        >
          {paused ?
            <Play className={"size-6 pl-0.5 fill-foreground text-foreground"}/> :
            <Pause className={"size-6 fill-foreground text-foreground"}/>
          }
        </div>
      </div>
      <div className="flex w-full items-center justify-start gap-2">
        <PlayerButton onClick={goToNextTrack} icon={<SkipForward/>}/>
        <PlayerButton
          onClick={handleRepeatToggle}
          icon={
            repeatMode === "none"
              ? <Repeat/>
              : repeatMode === "all" ? <Repeat/> : <Repeat1/>
          }
          className={repeatMode !== "none" ? "text-accent" : "text-foreground"}
        />
      </div>
    </div>
  );
};