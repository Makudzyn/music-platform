'use client';

import TimeSlider from "@/app/features/player/TimeSlider";
import { Box } from "@mui/material";
import Image from "next/image";
import VolumeSlider from "@/app/features/player/VolumeSlider";
import PlayerControls from "@/app/features/player/PlayerControls";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect, useRef, useState } from "react";
import { nextTrack, pause, play, setCurrentPosition, setCurrentTrack, setTotalDuration } from "@/app/features/player/playerSlice";
import { updateTrackListens } from "@/app/services/tracksService";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasListenedRef = useRef(false);
  const dispatch = useAppDispatch();
  const {volume, currentTrack, paused} = useAppSelector(state => state.player);


  const handleLoadedMetadata = () => {
    dispatch(setTotalDuration(audioRef.current!.duration));
  }

  const handleTimeUpdate = () => {
    dispatch(setCurrentPosition(audioRef.current!.currentTime));
    if ((audioRef.current!.currentTime > audioRef.current!.duration * 0.2) && !hasListenedRef.current) {
      updateTrackListens(currentTrack._id);
      hasListenedRef.current = true;
    }
  }

  useEffect(() => {
    if(currentTrack) {
      if (audioRef.current) {
        audioRef.current!.pause();
      }
      audioRef.current = new Audio(`http://localhost:5000/${currentTrack.audio}`);
      audioRef.current!.volume = volume / 100;

      audioRef.current!.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current!.addEventListener('timeupdate', handleTimeUpdate);

      audioRef.current!.play()
      .then(dispatch(play()))
      .catch(error => {
        console.error('Failed to play audio:', error);
      });

    }
    return () => {
      if (audioRef.current) {
        audioRef.current?.pause();
        audioRef.current!.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current!.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current = null;
        setCurrentTrack(null);
        hasListenedRef.current = false;
        dispatch(pause())
      }
    };
  },[currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current!.onended = () => {
        dispatch(nextTrack());
        if (!paused) {
          audioRef.current!.play()
          .catch(error => {
            console.error("Failed to play next track:", error);
          });
        }
      };
    }
  }, [currentTrack]);


  useEffect(() => {
    if (audioRef.current) {
      if (paused) {
        audioRef.current!.pause();
      } else {
        audioRef.current!.play()
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
      }
    }
  }, [paused]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current!.volume = volume / 100;
    }
  }, [volume]);


  return (
    <div className="h-[4.5rem] w-full fixed bottom-0 flex flex-row items-center justify-between py-2.5 bg-black gap-2">
      <div className="min-w-44 flex items-center ps-2 w-1/4">
        {currentTrack &&
          <div className="flex flex-row justify-start items-center translate-x-0 transition-transform">
            <div className="relative flex-shrink-0 rounded overflow-hidden shadow size-14 bg-gray-700 mr-2 cursor-pointer">
              <Image
                src={`http://localhost:5000/${currentTrack.thumbnail}`}
                alt={"Song thumbnail"}
                width={56}
                height={56}
              />
            </div>
            <div className="flex flex-col text-white leading-normal text-sm">
              <div className="text-white">{currentTrack.title}</div>
              <div className="text-sub-gray text-xs">{currentTrack.artist}</div>
            </div>
          </div>
        }
      </div>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center',
        width: "50%",
        maxWidth: "45.125rem"
      }}>
        <PlayerControls />
        <TimeSlider audioRef={audioRef} />
      </Box>
      <div className="w-1/4">
        <VolumeSlider />
      </div>
    </div>
  );
};
