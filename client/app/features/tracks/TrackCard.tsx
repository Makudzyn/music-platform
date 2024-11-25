'use client';

import { Card, CardContent } from '@ui/card';
import { Track } from '@lib/defenitions';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { pause, play, setCurrentTrack } from '@lib/redux/playerSlice';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import Link from 'next/link';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface TrackCardProps {
  track: Track;
}

export default function TrackCard({ track }: TrackCardProps) {
  const dispatch = useAppDispatch();
  const { paused, currentTrack } = useAppSelector((state) => state.player);

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

  const getImageUrl = (apiUrl: string, path: string) => {
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    const imagePath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${imagePath}`;
  };

  return (
    <Card className="w-full max-w-80">
      <CardContent className="flex flex-row items-center p-2">
        <CustomTooltip content="Play track" side="bottom">
          <div
            onClick={() => handleTrackChange(track)}
            className="relative flex items-center justify-center cursor-pointer size-14 group shrink-0"
          >
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 size-14 group-hover:opacity-100">
              {isActive && !paused ? (
                <Pause className="fill-white stroke-white" />
              ) : (
                <Play className="fill-white stroke-white" />
              )}
            </div>
            <Image
              src={getImageUrl(process.env.NEXT_PUBLIC_API_URL!, track.thumbnail)}
              alt={`${track.title} song thumbnail`}
              className="rounded-sm object-cover transition-all duration-300 group-hover:brightness-75"
              width={56}
              height={56}
            />
          </div>
        </CustomTooltip>
        <div className="flex flex-col text-sm font-semibold leading-normal text-foreground pl-3 overflow-hidden">
          <CustomTooltip content="Go to track`s page" side="top">
            <Link
              className="truncate decoration-foreground hover:underline"
              href={`/tracks/${track._id}`}
            >
              {track.title}
            </Link>
          </CustomTooltip>
          <CustomTooltip content="Go to artist`s page" side="bottom">
            <Link
              className="text-xs text-secondary truncate decoration-foreground hover:underline dark:text-accent"
              href={`/artist/${track.artist._id}`}
            >
              {track.artist.name}
            </Link>
          </CustomTooltip>
        </div>
      </CardContent>
    </Card>
  );
}
