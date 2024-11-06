'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { setVolume } from '@/lib/redux/playerSlice';
import * as Slider from '@radix-ui/react-slider';
import { Volume1, Volume2, VolumeOff } from 'lucide-react';
import PlayerButton from '@/app/features/player/PlayerButton';

export default function VolumeSlider() {
  const dispatch = useAppDispatch();
  const { volume } = useAppSelector((state) => state.player);
  const handleVolumeChange = (value: number | number[]) => {
    dispatch(setVolume(Number(value)));
  };
  return (
    <div className="flex flex-row items-center justify-end gap-2 w-[14.5rem]">
      <PlayerButton
        onClick={() => undefined}
        icon={
          volume === 0 ? <VolumeOff /> : volume < 50 ? <Volume1 /> : <Volume2 />
        }
      />

      <Slider.Root
        className="relative flex h-3 w-full touch-none select-none items-center overflow-hidden py-1 max-w-48 group"
        defaultValue={[25]}
        value={[volume]}
        onValueChange={handleVolumeChange}
      >
        <Slider.Track className="relative h-1 grow overflow-hidden rounded-sm transition-all duration-500 ease-linear bg-accent-foreground will-change-[width] group group-hover:shadow-md focus:outline-none dark:bg-accent-foreground">
          <Slider.Range className="absolute h-full rounded-sm bg-secondary group-hover:bg-accent dark:bg-accent dark:group-hover:bg-secondary" />
        </Slider.Track>
        <Slider.Thumb className="block rounded-full transition-all duration-200 ease-linear bg-secondary size-0 will-change-[left] group-hover:size-3 group-hover:shadow-foreground focus:outline-none dark:bg-accent" />
      </Slider.Root>
    </div>
  );
}
