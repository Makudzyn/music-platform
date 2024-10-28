'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { setVolume } from "@/lib/redux/playerSlice";
import * as Slider from '@radix-ui/react-slider';
import { Volume1, Volume2, VolumeOff } from "lucide-react";
import PlayerButton from "@/app/features/player/PlayerButton";

export default function VolumeSlider() {
  const dispatch = useAppDispatch();
  const {volume} = useAppSelector(state => state.player);
  const handleVolumeChange = (value: number | number[]) => {
    dispatch(setVolume(Number(value)));
  }
  return (
    <div className="flex w-[14.5rem] flex-row items-center justify-end gap-2">
      <PlayerButton
        onClick={() => undefined}
        icon={
          volume === 0 ? <VolumeOff/> :
            volume < 50 ?
              <Volume1/> : <Volume2/>
        }
      />

      <Slider.Root
        className="relative flex h-3 w-full touch-none select-none items-center overflow-hidden py-1 max-w-48 group"
        defaultValue={[25]}
        value={[volume]}
        onValueChange={handleVolumeChange}
      >
        <Slider.Track
          className="relative h-1 grow overflow-hidden rounded-sm bg-accent-foreground transition-all duration-500 ease-linear will-change-[width] group group-hover:shadow-md focus:outline-none">
          <Slider.Range className="absolute h-full rounded-sm bg-secondary group-hover:bg-accent"/>
        </Slider.Track>
        <Slider.Thumb
          className="block rounded-full bg-secondary transition-all duration-200 ease-linear size-0 will-change-[left] group-hover:size-3 group-hover:shadow-yellow-500 focus:outline-none"
        />
      </Slider.Root>
    </div>
  );
};