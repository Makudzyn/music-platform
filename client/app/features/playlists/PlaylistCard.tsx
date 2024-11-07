import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Playlist } from '@/lib/defenitions';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const capitalizedType =
    playlist.type.charAt(0).toUpperCase() + playlist.type.slice(1);

  return (
    <Card className="group transition-all duration-300">
      <CardContent className="pb-4 px-0">
        <CustomTooltip content={`Go to ${playlist.type}\`s page`}>
          <Link
            href={`/${playlist.type}s/${playlist._id}`}
            className="group/title"
          >
            <div className="aspect-square relative overflow-hidden rounded-t-md mb-4">
              <Image
                src={`http://localhost:5000/${playlist.coverImage}`}
                alt={`${playlist.title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="font-semibold text-foreground truncate decoration-foreground px-4 group-hover/title:underline">
              {playlist.title}
            </h3>
          </Link>
        </CustomTooltip>
        <p className="text-sm text-muted-foreground truncate px-4">
          {capitalizedType}
          <span className="mx-1">•</span>
          <Link
            className="decoration-muted-foreground hover:underline"
            href={
              playlist.type === 'album'
                ? `/artists/${playlist.artist._id}`
                : `/users/${playlist.owner._id}`
            }
          >
            {playlist.type === 'album'
              ? playlist.artist.name
              : playlist.owner.username}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
