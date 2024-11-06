'use client';

import Image from 'next/image';
import { Track } from '@/lib/defenitions';
import Link from 'next/link';
import { pause, play, setCurrentTrack } from '@/lib/redux/playerSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { cn, formatDate, formatTime } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';

interface TrackItemProps {
  track: Track;
  index: number;
}

export default function TrackItem({ track, index }: TrackItemProps) {
  const dispatch = useAppDispatch();
  const { currentPosition, paused, currentTrack } = useAppSelector(
    (state) => state.player,
  );

  //To see if this track is the one that's playing now.
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
  };

  return (
    <div className="col-span-full grid items-center rounded-sm py-1 transition-all grid-cols-subgrid group/buttons hover:bg-primary/30">
      <div className="relative flex items-center justify-center size-12">
        {!isActive && (
          <span className="text-base group-hover/buttons:opacity-0 transition-opacity text-muted-foreground">
            {index + 1}
          </span>
        )}
        <button
          onClick={() => handleTrackChange(track)}
          className={cn(
            'absolute flex justify-center items-center transition-opacity',
            isActive
              ? 'opacity-100'
              : 'opacity-0 group-hover/buttons:opacity-100',
          )}
        >
          {!isActive ? (
            // Показываем Play при наведении на неактивный трек
            <Play className="size-5 fill-foreground" />
          ) : // Для активного трека показываем Play/Pause в зависимости от состояния
          paused ? (
            <Play className="size-5 fill-foreground" />
          ) : (
            <Pause className="size-5 fill-foreground" />
          )}
        </button>
      </div>
      <Link href={`/tracks/${track._id}`} className="flex items-center group">
        <Image
          src={`http://localhost:5000/${track.thumbnail}`}
          alt={`${track.title} song thumbnail`}
          className="mr-3 rounded-sm"
          width={48}
          height={48}
        />
        <span className="font-medium decoration-foreground group-hover:underline">
          {track.title}
        </span>
      </Link>
      <Link href={`/artists/${track.artist._id}`} className="group">
        <span className="decoration-foreground group-hover:underline">
          {track.artist.name}
        </span>
      </Link>
      <Link href={`/albums/${track.album?._id}`} className="group">
        <span className="decoration-foreground group-hover:underline">
          {track.album?.title}
        </span>
      </Link>
      <div className="text-muted-foreground">{formatDate(track.createdAt)}</div>
      <div className="flex items-center justify-center text-muted-foreground">
        {isActive ? formatTime(currentPosition) : formatTime(track.duration)}
      </div>
    </div>
  );
}
