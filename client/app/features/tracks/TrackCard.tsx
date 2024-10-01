'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Track } from "@/lib/defenitions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { pause, play, setCurrentTrack } from "@/lib/reducers/playerSlice";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({track}: TrackCardProps) {
  const dispatch = useDispatch();
  const {paused, currentTrack} = useAppSelector(state => state.player);
  const isActive = currentTrack && currentTrack._id === track._id;

  const handleTrackChange = (track: Track) => {
    if (isActive) {
      if (paused) {
        dispatch(play());
      } else {
        dispatch(pause());
      }
    } else {
      dispatch(setCurrentTrack(track));
    }
  }
  return (
    <Card className="w-full">
      <CardContent className="flex flex-row items-center p-2">
        <div
          onClick={() => handleTrackChange(track)}
          className="relative flex items-center justify-center cursor-pointer size-14 group shrink-0"
        >
          <div
            className="absolute inset-0 z-10 flex items-center justify-center text-background opacity-0 transition-opacity duration-300 size-14 group-hover:opacity-100"
          >
            {isActive && !paused ? <Pause className="fill-background" /> : <Play className="fill-background" />}
          </div>
          <Image
            src={`http://localhost:5000/${track.thumbnail}`}
            alt="Song thumbnail"
            className="rounded-sm object-cover transition-all duration-300 group-hover:brightness-75"
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col text-sm font-semibold leading-normal text-foreground pl-3 overflow-hidden">
          <div className="truncate">{track.title}</div>
          <div className="text-xs text-secondary truncate">{track.artist.name}</div>
        </div>
      </CardContent>
    </Card>
  );
};