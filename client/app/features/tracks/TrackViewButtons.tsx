'use client';

import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, Share2 } from "lucide-react";
import { Track } from "@/lib/defenitions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { pause, play, setCurrentTrack } from "@/lib/redux/playerSlice";

interface TrackViewButtonsProps {
  track: Track;
}

export default function TrackViewButtons({track}: TrackViewButtonsProps) {
  const dispatch = useAppDispatch();
  const {paused, currentTrack} = useAppSelector(state => state.player);
  const isActive = currentTrack && currentTrack._id === track._id;

  const handlePlayPause = () => {
    if (isActive) {
      if (paused) {
        dispatch(play())
      } else {
        dispatch(pause())
      }
    } else {
      dispatch(setCurrentTrack(track));
    }
  }
  return (
    <div className="flex gap-4 mb-6">
      <Button size="lg" className="rounded-full" onClick={handlePlayPause}>
        <PlayCircle className="mr-2 h-6 w-6"/>
        Play
      </Button>
      <Button size="icon" variant="outline" className="rounded-full">
        <Heart className="h-6 w-6"/>
      </Button>
      <Button size="icon" variant="outline" className="rounded-full">
        <Share2 className="h-6 w-6"/>
      </Button>
    </div>
  );
};