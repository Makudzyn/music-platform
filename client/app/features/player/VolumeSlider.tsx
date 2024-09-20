'use client';

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setVolume } from "@/app/features/player/playerSlice";
import IconWrapper from "@/app/features/player/IconWrapper";
import * as Slider from '@radix-ui/react-slider';
import { ListMusic, Volume1, Volume2, VolumeOff } from "lucide-react";

export default function VolumeSlider() {
  const dispatch = useAppDispatch();
  const {volume} = useAppSelector(state => state.player);
  const handleVolumeChange = (value: number | number[]) => {
    console.log(value)
    dispatch(setVolume(Number(value)));
  }
  return (
    <div className="gap-2 flex flex-row justify-end items-center w-full">
      <IconWrapper>
        <ListMusic/>
      </IconWrapper>
      <IconWrapper>
        {volume === 0 && (
          <VolumeOff/>
        )}
        {volume >= 1 && volume < 50 && (
          <Volume1/>
        )}
        {volume >= 50 && volume <= 100 && (
          <Volume2/>
        )}
      </IconWrapper>
      <Slider.Root
        className={"text-white h-1 w-full max-w-48 py-1 hover:text-yellow-600 group"}
        aria-label="volume-slider"
        value={volume}
        min={0}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
      >
        <Slider.Track className={"h-1 will-change-[width] transition-all duration-500 ease-linear"}>
          <Slider.Range className={"text-gray-400 h-1"}/>
        </Slider.Track>
        <Slider.Thumb className={"size-0 bg-white border-0 transition-all duration-500 ease-linear will-change-[left] group-hover:size-3 group-hover:shadow-md"}/>
      </Slider.Root>
    </div>
  );
};