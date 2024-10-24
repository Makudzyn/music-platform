'use client';

import TimeSlider from "@/app/features/player/TimeSlider";
import VolumeSlider from "@/app/features/player/VolumeSlider";
import PlayerControls from "@/app/features/player/PlayerControls";
import SongInfo from "@/app/features/player/SongInfo";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useRef } from "react";
import { nextTrack, pause, play, setCurrentPosition, setCurrentTrack, setTotalDuration } from "@/lib/reducers/playerSlice";
import { updateTrackListens } from "@/app/services/tracksService";
import { ListMusic } from "lucide-react";
import PlayerButton from "@/app/features/player/PlayerButton";

interface PlayerProps {
  toggleQueuePanel: () => void;
}

export default function Player({ toggleQueuePanel }: PlayerProps) {
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
    <div className="z-50 flex w-full flex-row items-center justify-between gap-2 bg-background min-w-[38.5rem] h-[4.5rem] py-2.5 border-t border-border">
      <div className="flex items-center min-w-40 ps-2 w-[30%]">
        <SongInfo currentTrack={currentTrack}/>
      </div>
      <div className="flex flex-col items-center justify-between w-[40%] max-w-[45.125rem]">
        <PlayerControls />
        <TimeSlider audioRef={audioRef} />
      </div>
      <div className="flex flex-row justify-end w-[30%] min-w-40 pe-2">
        <PlayerButton
          onClick={toggleQueuePanel}
          icon={<ListMusic/>}
        />
        <VolumeSlider />
      </div>
    </div>
  );
};
