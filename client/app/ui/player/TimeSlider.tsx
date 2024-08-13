'use client';

import { Box, Button, Slider, Typography } from "@mui/material";
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

interface TimeSliderProps {
  currentPosition: number;
  totalDuration: number;
  active: boolean;
}

type Repeat = "none" | "all" | "one";

export default function TimeSlider({ currentPosition, totalDuration, active }: TimeSliderProps) {
  const [position, setPosition] = useState(0);
  const [repeat, setRepeat] = useState<Repeat>("none");
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', width: "50%", maxWidth: "45.125rem"}}>
      <div className="w-full h-8 gap-4 mb-2 flex flex-row justify-between items-center ">
        <div className="w-full ps-2 pe-2 flex justify-center items-center text-sub-gray">
          <div className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white">
            <SkipPreviousIcon sx={{width: 32, height: 32}}/>
          </div>
        </div>
        <div className="w-full ps-2 pe-2 flex justify-center items-center ">
        <div className="bg-white rounded-full cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-gray-100">
            {active ? <PauseIcon sx={{width: 32, height: 32}}/> : <PlayArrowIcon sx={{width: 32, height: 32}}/>}
          </div>
        </div>
        <div className="w-full ps-2 pe-2 flex justify-start items-center text-sub-gray">
          <div className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white">
            <SkipNextIcon sx={{width: 32, height: 32}}/>
          </div>
          <div className="cursor-pointer transition-all duration-300 hover:scale-110 hover:text-white">
            {repeat === "none" && (
              <RepeatIcon sx={{ width: 32, height: 32 }} />
            )}
            {repeat === "all" && (
              <RepeatIcon sx={{ width: 32, height: 32, color: repeat === "all" ? "green" : "inherit" }} />
            )}
            {repeat === "one" && (
              <RepeatOneIcon sx={{ width: 32, height: 32, color: repeat === "one" ? "green" : "inherit" }} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-row items-center w-full">
      <div className="flex justify-center items-center text-xs font-medium opacity-35 size-10">
        {formatTime(position)}
      </div>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: '100%', mx: 2}}>
        <Slider
          aria-label="time-indicator"
          size="small"
          min={0}
          step={1}
          max={totalDuration}
          variant="determinate"
          value={position}
          onChange={(_, value) => setPosition(value as number)}
        />
      </Box>
      <div className="flex justify-center items-center text-xs font-medium opacity-35 size-10">
        {formatTime(totalDuration)}
      </div>
      </div>
    </Box>
  );
};