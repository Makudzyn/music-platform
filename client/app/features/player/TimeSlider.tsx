'use client';

import { Slider } from "@mui/material";
import { MutableRefObject } from "react";
import { setCurrentPosition } from "@/app/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { formatTime } from "@/app/lib/utils";
import styled from "@emotion/styled";

interface TimeSliderProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const StyledTimeSlider = styled(Slider)(({ theme }) => ({
  color: '#fff',
  height: 4,
  paddingY: 4,
  '&:hover': {
    color: "#1db954",
  },
  '& .MuiSlider-thumb': {
    height: 0,
    width: 0,
    backgroundColor: '#fff',
    border: 0,
    transition: 'left 500ms ease',
    willChange: 'left',
    '&:hover': {
      height: 12,
      width: 12,
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    height: 4,
    willChange: 'width',
    transition: 'width 500ms ease',
  },
  '& .MuiSlider-rail': {
    color: 'rgba(255,255,255,0.65)',
    height: 4,
  },
}));

export default function TimeSlider({audioRef}: TimeSliderProps) {
  const dispatch = useAppDispatch();
  const {totalDuration, currentPosition} = useAppSelector(state => state.player);

  const handlePositionChange = (_, value: number | number[]) => {
    const newPosition = Number(value);
    audioRef.current!.currentTime = newPosition;
    dispatch(setCurrentPosition(newPosition));
  }

  return (
    <div className="flex justify-between flex-row items-center w-full h-4 gap-2">
      <div className="flex justify-end items-center text-xs text-white font-medium opacity-65 min-w-10 h-4">
        {formatTime(currentPosition)}
      </div>
      <div className="flex justify-center items-center w-full h-3">
        <StyledTimeSlider
          aria-label="time-indicator"
          size="small"
          min={0}
          value={currentPosition}
          max={totalDuration}
          onChange={handlePositionChange}
        />
      </div>
      <div className="flex justify-start items-center text-xs text-white font-medium opacity-65 min-w-10 h-4">
        {formatTime(totalDuration)}
      </div>
    </div>
  );
};