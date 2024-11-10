'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Button } from '@ui/button';
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import { areArraysEqualUnordered, cn } from '@lib/utils';
import { Artist, Track } from '@lib/defenitions';
import { useAppDispatch, useAppSelector } from '@lib/hooks/hooks';
import {
  pause,
  play,
  setCurrentTrack,
  setQueue,
} from '@lib/redux/playerSlice';

interface ArtistHeaderProps {
  artist: Artist;
  tracks: Track[];
}

export default function ArtistHeader({ artist, tracks }: ArtistHeaderProps) {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { paused, queue } = useAppSelector((state) => state.player);
  const currentArtistInQ = useMemo(
    () => areArraysEqualUnordered(tracks, queue),
    [tracks, queue],
  );

  const handleSongsPlay = () => {
    //If the queue is empty or tracks in queue don`t match tracks loaded with this page - overwrite the queue.
    if (queue.length === 0 || !currentArtistInQ) {
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
    <div className="mb-4 h-full">
      <div className="relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-t to-transparent from-foreground dark:from-background" />
        <div
          className={cn(
            'relative overflow-hidden transition-all duration-500',
            isExpanded ? 'h-[32rem]' : 'h-[28rem]',
          )}
        >
          <Image
            src={`http://localhost:5000/${artist.artistImage}`}
            alt={`${artist.name} cover`}
            fill
            className="object-cover object-top"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 z-20 h-6 bg-gradient-to-t to-transparent from-background" />
        </div>
        <div className="absolute bottom-0 left-0 z-20 max-w-2xl p-6">
          <h1 className="mb-4 text-4xl font-bold drop-shadow-lg text-primary-foreground dark:text-foreground md:text-6xl">
            {artist.name}
          </h1>
          <div className="relative">
            <p
              className={cn(
                'text-sm md:text-base text-primary-foreground/90 dark:text-foreground/90 mb-2 transition-all duration-500 drop-shadow-md',
                isExpanded
                  ? 'max-h-[62.5rem]'
                  : 'max-h-12 overflow-hidden opacity-90',
              )}
            >
              {artist.aboutInfo}
            </p>
            {artist.aboutInfo.length > 100 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 py-0 pl-0 pr-1 rounded-sm transition-all duration-500 text-primary-foreground/80 hover:text-primary-foreground dark:text-foreground/80 dark:hover:text-foreground"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <div className="flex h-5 items-center justify-center">
                    Show less <ChevronUp className="ml-1 size-5" />
                  </div>
                ) : (
                  <div className="flex h-5 items-center justify-center">
                    Show more <ChevronDown className="ml-1 size-5" />
                  </div>
                )}
              </Button>
            )}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <Button
              size="lg"
              variant="default"
              className="rounded-sm border p-4 px-5 shadow-lg bg-foreground border-accent hover:bg-primary"
              onClick={handleSongsPlay}
            >
              {currentArtistInQ && !paused ? (
                <Pause className="mr-2 stroke-primary-foreground size-6 fill-primary-foreground" />
              ) : (
                <Play className="mr-2 stroke-primary-foreground size-6 fill-primary-foreground" />
              )}
              Play Artist
            </Button>
            <p className="text-sm text-primary-foreground/80 dark:text-foreground/80">
              {artist.totalListens} all time listens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
