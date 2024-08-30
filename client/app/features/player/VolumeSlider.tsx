'use client';

import { Slider, Stack } from "@mui/material";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { setVolume } from "@/app/features/player/playerSlice";
import styled from "@emotion/styled";
import IconWrapper from "@/app/features/player/IconWrapper";

const StyledVolumeSlider = styled(Slider)(({theme}) => ({
  color: '#fff',
  height: 4,
  width: "100%",
  maxWidth: 200,
  paddingY: 4,
  '&:hover': {
    color: "#1db954"
  },
  '& .MuiSlider-thumb': {
    height: 0,
    width: 0,
    backgroundColor: '#fff',
    border: 0,
    '&:hover': {
      height: 12,
      width: 12,
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)'
    }
  },
  '& .MuiSlider-track': {
    height: 4,
  },
  '& .MuiSlider-rail': {
    color: 'rgba(255,255,255,0.65)',
    height: 4
  }
}));

export default function VolumeSlider() {
  const dispatch = useAppDispatch();
  const {volume} = useAppSelector(state => state.player);
  const handleVolumeChange = (_, value: number | number[]) => {
    dispatch(setVolume(Number(value)));
  }
  return (
    <div className="gap-2 flex flex-row justify-end items-center w-full">
      <IconWrapper>
        <AudiotrackRoundedIcon fontSize="small"/>
      </IconWrapper>
      <IconWrapper>
        <QueueMusicRoundedIcon/>
      </IconWrapper>
      <IconWrapper>
        {volume === 0 && (
          <VolumeOffRoundedIcon/>
        )}
        {volume >= 1 && volume < 50 && (
          <VolumeDownRoundedIcon/>
        )}
        {volume >= 50 && volume <= 100 && (
          <VolumeUpRoundedIcon/>
        )}
      </IconWrapper>
      <StyledVolumeSlider
        aria-label="volume-slider"
        value={volume}
        min={0}
        max={100}
        step={1}
        size="small"
        onChange={handleVolumeChange}
      />
    </div>
  );
};