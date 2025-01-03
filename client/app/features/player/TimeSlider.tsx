'use client';

import { MutableRefObject } from 'react';
import { setCurrentPosition } from '@lib/redux/playerSlice';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { formatTime } from '@lib/utils';
import * as Slider from '@radix-ui/react-slider';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface TimeSliderProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function TimeSlider({ audioRef }: TimeSliderProps) {
  const dispatch = useAppDispatch();
  const { totalDuration, currentPosition } = useAppSelector(
    (state) => state.player,
  );

  //Handling slider position changes
  const handlePositionChange = (value: number[]) => {
    const newPosition = Number(value);
    audioRef.current!.currentTime = newPosition;
    dispatch(setCurrentPosition(newPosition));
  };

  return (
    <div className="flex h-4 w-full flex-row items-center justify-between gap-2 text-secondary dark:text-accent">
      <CustomTooltip content="Current time position">
        <div className="flex h-4 select-none items-center justify-end text-xs font-semibold opacity-90 min-w-10">
          {formatTime(currentPosition)}
        </div>
      </CustomTooltip>
      <CustomTooltip content="Change time position">
        <div className="flex h-3 w-full items-center justify-center">
          <Slider.Root
            className="relative flex h-1 w-full touch-none select-none items-center py-1 group"
            defaultValue={[0]}
            value={[currentPosition]}
            max={totalDuration}
            onValueChange={handlePositionChange}
          >
            <Slider.Track className="relative h-1 grow overflow-hidden rounded-sm transition-all duration-500 ease-linear bg-accent-foreground will-change-[width] group group-hover:shadow-md focus:outline-none dark:bg-accent-foreground">
              <Slider.Range className="absolute h-full rounded-sm bg-secondary group-hover:bg-accent dark:bg-accent dark:group-hover:bg-secondary" />
            </Slider.Track>
            <Slider.Thumb className="block rounded-full transition-all duration-200 ease-linear bg-secondary size-0 will-change-[left] group-hover:size-3 group-hover:shadow-foreground focus:outline-none dark:bg-accent" />
          </Slider.Root>
        </div>
      </CustomTooltip>
      <CustomTooltip content="Total duration">
        <div className="flex h-4 select-none items-center justify-start text-xs font-semibold opacity-90 min-w-10">
          {formatTime(totalDuration)}
        </div>
      </CustomTooltip>
    </div>
  );
}
