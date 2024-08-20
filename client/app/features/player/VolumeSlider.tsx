'use client';

import { Slider, Stack } from "@mui/material";
import { VolumeDownRounded, VolumeOffRounded, VolumeUpRounded } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setVolume } from "@/app/features/player/playerSlice";
import { MutableRefObject } from "react";

interface VolumeSliderProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

export default function VolumeSlider({audioRef}: VolumeSliderProps) {
  const dispatch = useAppDispatch();
  const {volume} = useAppSelector(state => state.player);
  const handleVolumeChange = (_, value: number | number[]) => {
    const newVolume = Number(value);
    audioRef.current!.volume = Number(newVolume) / 100;
    dispatch(setVolume(newVolume));
  }
  return (
    <Stack spacing={2} direction="row" sx={{mb: 1, px: 1}} alignItems="center">
      {volume === 0 && (
        <VolumeOffRounded htmlColor="gray"/>
      )}
      {volume >= 1 && volume < 50 && (
        <VolumeDownRounded htmlColor="gray"/>
      )}
      {volume >= 50 && volume <= 100 && (
        <VolumeUpRounded htmlColor="gray"/>
      )}
      <Slider
        aria-label="Volume"
        value={volume}
        min={0}
        max={100}
        step={1}
        size="small"
        onChange={handleVolumeChange}
        sx={{
          color: '#fff',
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 0,
            height: 0,
            backgroundColor: '#fff',
            '&::before': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: 'none',
              width: 12,
              height: 12,
            }
          }
        }}
      />
    </Stack>
  );
};