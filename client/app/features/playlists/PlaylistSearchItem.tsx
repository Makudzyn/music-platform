'use client';

import { Playlist } from '@lib/defenitions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PlaylistSearchItemProps {
  playlist: Playlist;
  onSelect: () => void;
}

export default function PlaylistSearchItem({
  playlist,
  onSelect,
}: PlaylistSearchItemProps) {
  const router = useRouter();

  const handleSelect = () => {
    router.push(`/${playlist.type}s/${playlist._id}`);
    onSelect();
  };

  return (
    <li
      role="option"
      className="flex h-20 cursor-pointer px-4 py-2 transition-all duration-150 group hover:bg-accent"
      onClick={handleSelect}
    >
      <div className="relative mr-2 flex flex-shrink-0 items-center justify-center overflow-hidden rounded-md shadow size-16">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${playlist.coverImage}`}
          alt="Playlist cover"
          width={64}
          height={64}
          className="rounded-md"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-primary group-hover:text-primary-foreground truncate">
          {playlist.title}
        </div>
        <div className="text-xs text-muted-foreground group-hover:text-foreground truncate">
          {playlist.type === 'album' ? 'Album' : 'Playlist'} •{' '}
          {playlist.artist.name}
        </div>
        <div className="text-xs text-muted-foreground group-hover:text-foreground truncate">
          {playlist.tracksAmount} tracks
        </div>
      </div>
    </li>
  );
}
