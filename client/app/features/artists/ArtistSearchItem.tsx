'use client';

import { Artist } from '@lib/defenitions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ArtistSearchItemProps {
  artist: Artist;
  onSelect: () => void;
}

export default function ArtistSearchItem({
  artist,
  onSelect,
}: ArtistSearchItemProps) {
  const router = useRouter();

  const handleSelect = () => {
    router.push(`/artists/${artist._id}`);
    onSelect();
  };

  return (
    <li
      role="option"
      className="flex h-16 cursor-pointer px-4 py-2 transition-all duration-150 group hover:bg-accent"
      onClick={handleSelect}
    >
      <div className="relative mr-2 flex flex-shrink-0 aspect-square items-center justify-center overflow-hidden rounded-full shadow size-12">
        <Image
          src={`http://localhost:5000/${artist.artistImage}`}
          alt="Artist image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center min-w-0 flex-1">
        <div className="font-medium text-primary group-hover:text-primary-foreground truncate">
          {artist.name}
        </div>
      </div>
    </li>
  );
}
