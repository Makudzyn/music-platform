'use client';

import { Track } from "@/lib/defenitions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { pause, play, setCurrentTrack } from "@/lib/redux/playerSlice";
import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface QueueItemProps {
  track: Track;
  index: number;
}

export default function QueueItem({track, index}: QueueItemProps) {
  const dispatch = useAppDispatch();
  const {currentTrack, paused} = useAppSelector(state => state.player);
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
    <div
      className="grid grid-cols-[2rem,2.5rem,1fr] gap-3 items-center rounded-sm py-2 transition-all group/buttons hover:bg-primary/30">
      <div className="ml-1 relative flex items-center justify-center size-8">
        {!isActive &&
          <span className="text-sm group-hover/buttons:opacity-0 transition-opacity text-muted-foreground">
            {index + 1}
          </span>
        }
        <button
          onClick={() => handleTrackChange(track)}
          className={cn(
            "absolute flex justify-center items-center transition-opacity",
            isActive ? "opacity-100" : "opacity-0 group-hover/buttons:opacity-100"
          )}
        >
          {!isActive ? (
            // Показываем Play при наведении на неактивный трек
            <Play className="size-4 fill-foreground"/>
          ) : (
            // Для активного трека показываем Play/Pause в зависимости от состояния
            paused ? (
              <Play className="size-4 fill-foreground"/>
            ) : (
              <Pause className="size-4 fill-foreground"/>
            )
          )}
        </button>
      </div>

      <div className="flex items-center justify-center size-10">
        <Image
          src={`http://localhost:5000/${track.thumbnail}`}
          alt={`${track.title} song thumbnail`}
          className="rounded-sm"
          width={40}
          height={40}
        />
      </div>

      <div className="flex flex-col min-w-0 text-sm font-semibold leading-normal text-foreground mr-1.5">
        <Link
          href={`/tracks/${track._id}`}
          className="block group min-w-0"
        >
          <span className="block truncate decoration-foreground group-hover:underline">
            {track.title}
          </span>
        </Link>
        <Link
          href={`/artists/${track.artist._id}`}
          className="block group min-w-0"
        >
          <span className="block truncate text-secondary text-xs decoration-foreground group-hover:underline">
            {track.artist.name}
          </span>
        </Link>
      </div>
    </div>
  );
};