import { Artist } from '@/lib/defenitions';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="border-none shadow-none transition-colors duration-300 group bg-background hover:shadow mb-1">
      <CardContent className="p-4">
        <Link href={`/artists/${artist._id}`} className="block">
          <div className="relative mb-4 aspect-square overflow-hidden rounded-full">
            <Image
              src={`http://localhost:5000/${artist.artistImage}`}
              alt={`${artist.name} image`}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="text-start space-y-1">
            <h3 className="truncate font-semibold text-foreground">
              {artist.name}
            </h3>
            <p className="text-sm text-muted-foreground">Artist</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
