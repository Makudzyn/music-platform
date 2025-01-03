import { Playlist } from '@lib/defenitions';
import { Card, CardContent } from '@ui/card';
import Link from 'next/link';
import Image from 'next/image';
import CustomTooltip from '@/app/features/tooltip/Tooltip';

interface AlbumCardProps {
  playlist: Playlist;
}

export default function AlbumCard({ playlist }: AlbumCardProps) {
  return (
    <Card className="relative aspect-square w-full overflow-hidden group">
      <Link href={`/albums/${playlist._id}`} className="absolute size-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${playlist.coverImage}`}
          alt={`${playlist.title} album cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <CustomTooltip content={`Go to ${playlist.type}\`s page`}>
          <CardContent className="absolute px-2 py-1 inset-x-0 bottom-0 flex h-0 flex-col justify-center border-t border-transparent overflow-hidden transition-all duration-500 bg-foreground/60 group-hover:h-1/4 group-hover:border-accent">
            <div className="translate-y-full transform px-2 transition-transform duration-500  group-hover:translate-y-0">
              <h3 className="text-lg font-semibold text-background line-clamp-2">
                {playlist.title}
              </h3>
            </div>
          </CardContent>
        </CustomTooltip>
      </Link>
    </Card>
  );
}
