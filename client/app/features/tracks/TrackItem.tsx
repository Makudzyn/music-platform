'use client';

import Image from "next/image";
import { Track } from "@/lib/defenitions";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { nextTrack, pause, play, setCurrentTrack } from "@/lib/reducers/playerSlice";
import { useAppSelector } from "@/lib/hooks";
import { formatDate, formatTime } from "@/lib/utils";
import { Pause, Play } from "lucide-react";

interface TrackItemProps {
  track: Track;
  index: number;
}

export default function TrackItem({track, index}: TrackItemProps) {
  const dispatch = useDispatch();
  const {currentPosition, paused, currentTrack} = useAppSelector(state => state.player);
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
    <div className="col-span-full grid items-center rounded-sm py-1 transition-all grid-cols-subgrid hover:bg-primary/30">
      <div className="flex items-center justify-center size-12">
        {isActive ? (
          <button onClick={() => handleTrackChange(track)} >
            {paused ? <Play className="size-6 fill-foreground"/> : <Pause className="size-6 fill-foreground"/>}
          </button>
        ) : (
          <span className="text-base text-muted-foreground">{index + 1}</span>
        )}
      </div>
      <Link href={`tracks/${track._id}`} className="flex items-center group">
        <Image
          src={`http://localhost:5000/${track.thumbnail}`}
          alt={`${track.title} song thumbnail`}
          className="mr-3 rounded-sm"
          width={48}
          height={48}
        />
        <span className="font-medium decoration-foreground group-hover:underline">{track.title}</span>
      </Link>
      <Link href={`artists/${track.artist._id}`} className="group">
        <span className="decoration-foreground group-hover:underline">{track.artist.name}</span>
      </Link>
      <Link href={`albums/${track.album._id}`} className="group">
        <span className="decoration-foreground group-hover:underline">{track.album.title}</span>
      </Link>
      <div className="text-muted-foreground">
        {formatDate(track.createdAt)}
      </div>
      <div className="text-muted-foreground">
        {isActive ? formatTime(currentPosition) : formatTime(track.duration)}
      </div>
    </div>
  );
};
