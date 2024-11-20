'use client';

import { useRouter } from 'next/navigation';
import { Track } from '@lib/defenitions';
import Image from 'next/image';

interface TrackSearchItemProps {
  track: Track;
  onSelect: () => void;
}

export default function TrackSearchItem({
  track,
  onSelect,
}: TrackSearchItemProps) {
  const router = useRouter();

  const handleSelect = () => {
    router.push(`/tracks/${track._id}`);
    onSelect();
  };

  return (
    <li
      role="option"
      className="flex h-[4.5rem] cursor-pointer px-4 py-2 transition-all duration-150 group hover:bg-accent"
      onClick={handleSelect}
    >
      <div className="relative mr-2 flex flex-shrink-0 items-center justify-center overflow-hidden rounded shadow size-14">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${track.thumbnail}`}
          alt="Song thumbnail"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-primary group-hover:text-primary-foreground truncate">
          {track.title}
        </div>
        <div className="text-xs text-muted-foreground group-hover:text-foreground h-8 text-wrap truncate">
          {track.artist.name} • {track.album?.title}
        </div>
      </div>
    </li>
  );
}
