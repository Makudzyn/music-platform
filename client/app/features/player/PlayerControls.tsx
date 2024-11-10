'use client';

import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import {
  nextTrack,
  pause,
  play,
  previousTrack,
  setCurrentTrack,
  setQueue,
  setRepeatMode,
  toggleShuffle,
} from '@lib/redux/playerSlice';
import {
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import PlayerButton from '@/app/features/player/PlayerButton';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

export default function PlayerControls() {
  const dispatch = useAppDispatch();
  const { paused, repeatMode, shuffle, queue, currentTrack } = useAppSelector(
    (state) => state.player,
  );
  const tracks = useAppSelector((state) => state.tracks.tracks);

  const handlePlayPause = () => {
    if (paused) {
      if (queue && tracks.length > 0) {
        dispatch(setQueue(tracks));
      }
      if (!currentTrack) {
        dispatch(setCurrentTrack(queue[0]));
      }
      dispatch(play());
    } else {
      dispatch(pause());
    }
  };

  const handleRepeatToggle = () => {
    if (repeatMode === 'none') {
      dispatch(setRepeatMode('all'));
    } else if (repeatMode === 'all') {
      dispatch(setRepeatMode('one'));
    } else if (repeatMode === 'one') {
      dispatch(setRepeatMode('none'));
    }
  };

  const goToPreviousTrack = () => {
    dispatch(previousTrack());
  };

  const goToNextTrack = () => {
    dispatch(nextTrack());
  };

  const handleShuffleToggle = () => {
    dispatch(toggleShuffle());
  };

  return (
    <div className="mb-2 flex h-8 w-full flex-row items-center justify-between gap-4 text-white">
      <div className="flex w-full items-center justify-end gap-2">
        <PlayerButton
          onClick={handleShuffleToggle}
          icon={<Shuffle />}
          tooltip="Shuffle queue"
          className={shuffle ? 'text-accent' : 'text-foreground'}
        />
        <PlayerButton
          onClick={goToPreviousTrack}
          icon={<SkipBack />}
          tooltip="Go to previous track"
        />
      </div>
      <div className="flex items-center justify-center">
        <CustomTooltip content={paused ? 'Play song' : 'Pause song'}>
          <div
            onClick={handlePlayPause}
            className="cursor-pointer rounded-full p-1 shadow-sm transition-all duration-300 bg-background shadow-foreground hover:shadow-accent hover:scale-110 hover:shadow"
          >
            {paused ? (
              <Play
                className={'size-6 pl-0.5 fill-foreground text-foreground'}
              />
            ) : (
              <Pause className={'size-6 fill-foreground text-foreground'} />
            )}
          </div>
        </CustomTooltip>
      </div>
      <div className="flex w-full items-center justify-start gap-2">
        <PlayerButton
          onClick={goToNextTrack}
          icon={<SkipForward />}
          tooltip="Go to next track"
        />
        <PlayerButton
          onClick={handleRepeatToggle}
          tooltip="Change repeat mode"
          icon={
            repeatMode === 'none' ? (
              <Repeat />
            ) : repeatMode === 'all' ? (
              <Repeat />
            ) : (
              <Repeat1 />
            )
          }
          className={repeatMode !== 'none' ? 'text-accent' : 'text-foreground'}
        />
      </div>
    </div>
  );
}
