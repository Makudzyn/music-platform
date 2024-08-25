'use client';

import { Box, Slider } from "@mui/material";
import { MutableRefObject } from "react";
import { setCurrentPosition } from "@/app/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { formatTime } from "@/app/lib/utils";

interface TimeSliderProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function TimeSlider({audioRef}: TimeSliderProps) {
  const dispatch = useAppDispatch();
  const {totalDuration, currentPosition} = useAppSelector(state => state.player);

  const handlePositionChange = (_, value: number | number[]) => {
    const newPosition = Number(value);
    audioRef.current!.currentTime = newPosition;
    dispatch(setCurrentPosition(newPosition));
  }

  return (
    <div className="flex justify-between flex-row items-center w-full h-4">
      <div className="flex justify-center items-center text-xs text-white font-medium opacity-65 size-10">
        {formatTime(currentPosition)}
      </div>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: '100%', mx: 2}}>
        <Slider
          aria-label="time-indicator"
          size="small"
          min={0}
          value={currentPosition}
          max={totalDuration}
          onChange={handlePositionChange}
        />
      </Box>
      <div className="flex justify-center items-center text-xs text-white font-medium opacity-65 size-10">
        {formatTime(totalDuration)}
      </div>
    </div>
  );
};