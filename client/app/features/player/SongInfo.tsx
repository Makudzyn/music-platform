import Image from 'next/image';
import { Track } from '@lib/defenitions';
import Link from 'next/link';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface SongInfoProps {
  currentTrack: Track | null;
}

export default function SongInfo({ currentTrack }: SongInfoProps) {
  return (
    <>
      {currentTrack && (
        <div className="flex translate-x-0 flex-row items-center justify-start transition-transform">
          <CustomTooltip content="Go to track`s page">
            <Link
              href={`/tracks/${currentTrack._id}`}
              className="relative mr-2 flex-shrink-0 cursor-pointer overflow-hidden rounded shadow size-14"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${currentTrack.thumbnail}`}
                alt={'Song thumbnail'}
                width={56}
                height={56}
              />
            </Link>
          </CustomTooltip>
          <div className="flex flex-col text-sm font-semibold leading-normal text-foreground">
            <CustomTooltip content="Track title">
              <div>{currentTrack.title}</div>
            </CustomTooltip>
            <CustomTooltip content="Go to track`s artist page">
              <Link
                href={`/artists/${currentTrack.artist._id}`}
                className="cursor-pointer text-xs text-secondary dark:text-accent"
              >
                {currentTrack.artist.name}
              </Link>
            </CustomTooltip>
          </div>
        </div>
      )}
    </>
  );
}
