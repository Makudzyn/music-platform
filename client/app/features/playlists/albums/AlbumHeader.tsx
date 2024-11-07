'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { areArraysEqualUnordered, formatTotalDuration } from '@/lib/utils';
import { Playlist, Track } from '@/lib/defenitions';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import {
  pause,
  play,
  setCurrentTrack,
  setQueue,
} from '@/lib/redux/playerSlice';
import { useMemo } from 'react';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface AlbumHeaderProps {
  album: Playlist;
  tracks: Track[];
}

export default function AlbumHeader({ album, tracks }: AlbumHeaderProps) {
  const dispatch = useAppDispatch();
  const { paused, queue } = useAppSelector((state) => state.player);
  const currentAlbumInQ = useMemo(
    () => areArraysEqualUnordered(tracks, queue),
    [tracks, queue],
  );

  const handleAlbumPlay = () => {
    //If the queue is empty or tracks in queue don`t match tracks loaded with this page - overwrite the queue.
    if (queue.length === 0 || !currentAlbumInQ) {
      dispatch(setQueue(tracks));
      dispatch(setCurrentTrack(tracks[0]));
      dispatch(play());
    }
    if (paused) {
      dispatch(play());
    } else {
      dispatch(pause());
    }
  };

  return (
    <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-center">
      <CustomTooltip content={`Play ${album.type}\`s tracks`} side="bottom">
        <Button
          variant="ghost"
          className="relative flex-shrink-0 shadow-lg size-48 md:size-64 group"
          onClick={handleAlbumPlay}
        >
          <Image
            src={`http://localhost:5000/${album.coverImage}`}
            alt={`${album.title} cover`}
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 768px) 192px, 256px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/40 transition-all duration-300">
            <div className="size-11 rounded-full bg-background flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              {currentAlbumInQ && !paused ? (
                <Pause className="size-6 fill-foreground stroke-foreground" />
              ) : (
                <Play className="size-6 pl-0.5 fill-foreground stroke-foreground" />
              )}
            </div>
          </div>
        </Button>
      </CustomTooltip>

      <div className="flex flex-col items-start">
        <p className="mb-1 text-sm font-medium uppercase">{album.type}</p>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">{album.title}</h1>
        <p className="mb-2 text-base text-muted-foreground">
          {album.description}
        </p>
        <div className="flex items-center text-sm">
          <Link
            href={`/artists/${album.artist._id}`}
            className="font-semibold decoration-foreground hover:underline"
          >
            {album.artist.name}
          </Link>
          <span className="mx-1">•</span>
          <CustomTooltip content="Release date" side="bottom">
            <span>{album.releaseDate}</span>
          </CustomTooltip>
          <span className="mx-1">•</span>
          <CustomTooltip
            content={`Amount of tracks in ${album.type}`}
            side="bottom"
          >
            <span>{album.tracksAmount} songs,</span>
          </CustomTooltip>
          <CustomTooltip content="Total tracks duration" side="bottom">
            <span className="ml-1">
              {formatTotalDuration(album.totalDuration)}
            </span>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
}
