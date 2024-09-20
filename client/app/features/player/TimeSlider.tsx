'use client';

import { MutableRefObject } from "react";
import { setCurrentPosition } from "@/app/features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { formatTime } from "@/app/lib/utils";
import * as Slider from '@radix-ui/react-slider';

interface TimeSliderProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function TimeSlider({audioRef}: TimeSliderProps) {
  const dispatch = useAppDispatch();
  const {totalDuration, currentPosition} = useAppSelector(state => state.player);

  const handlePositionChange = (value: number | number[]) => {
    console.log(value);
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
        <Slider.Root
          className={"text-white h-1 py-1 hover:text-yellow-600 group"}
          aria-label="time-indicator"
          value={currentPosition}
          max={totalDuration}
          onValueChange={handlePositionChange}
        >
          <Slider.Track className={"h-1 will-change-[width] transition-all duration-500 ease-linear"}>
            <Slider.Range className={"text-gray-400 h-1"}/>
          </Slider.Track>
          <Slider.Thumb className={"size-0 bg-white border-0 transition-all duration-500 ease-linear will-change-[left] group-hover:size-3 group-hover:shadow-md"}/>
        </Slider.Root>
      </div>
      <div className="flex justify-start items-center text-xs text-white font-medium opacity-65 min-w-10 h-4">
        {formatTime(totalDuration)}
      </div>
    </div>
  );
};