'use client';

import { Button } from '@ui/button';
import { Heart, Play, Share2 } from 'lucide-react';
import { Track } from '@lib/defenitions';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { pause, play, setCurrentTrack } from '@lib/redux/playerSlice';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface TrackViewButtonsProps {
  track: Track;
}

export default function TrackViewButtons({ track }: TrackViewButtonsProps) {
  const dispatch = useAppDispatch();
  const { paused, currentTrack } = useAppSelector((state) => state.player);

  //To see if this track is the one that's playing now.
  const isActive = currentTrack && currentTrack._id === track._id;

  const handlePlayPause = () => {
    if (isActive) {
      if (paused) {
        dispatch(play());
      } else {
        dispatch(pause());
      }
    } else {
      dispatch(setCurrentTrack(track));
    }
  };
  return (
    <div className="mb-6 flex gap-4">
      <CustomTooltip content="Play track">
        <Button
          size="lg"
          variant="default"
          className="rounded-xl group/play"
          onClick={handlePlayPause}
        >
          <Play className="mr-2 transition-all fill-background stroke-background size-6" />
          <span className="transition-all group-hover/play:text-background">
            Play
          </span>
        </Button>
      </CustomTooltip>
      <CustomTooltip content="Add to favorites">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full border-none group/heart"
        >
          <Heart className="size-6 group-hover/heart:stroke-background" />
        </Button>
      </CustomTooltip>
      <CustomTooltip content="Share">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full border-none group/share bg-background"
        >
          <Share2 className="size-6 group-hover/share:stroke-background" />
        </Button>
      </CustomTooltip>
    </div>
  );
}
