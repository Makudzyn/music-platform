import Image from "next/image";
import Link from "next/link";
import { Playlist } from "@/lib/defenitions";
import { formatTotalDuration } from "@/lib/utils";

interface AlbumHeaderProps {
  album: Playlist;
}

export default function AlbumHeader({album}: AlbumHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-center">
      <div className="relative flex-shrink-0 shadow-lg size-48 md:size-64">
        <Image
          src={`http://localhost:5000/${album.coverImage}`}
          alt={`${album.title} cover`}
          fill
          className="object-cover rounded-sm"
          sizes="(max-width: 768px) 192px, 256px"
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="mb-1 text-sm font-medium uppercase">{album.type}</p>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">{album.title}</h1>
        <p className="mb-2 text-base text-muted-foreground">{album.description}</p>
        <div className="flex items-center text-sm">
          <Link href={`/artists/${album.artist._id}`} className="font-semibold">{album.artist.name}</Link>
          <span className="mx-1">•</span>
          <span className="">{album.releaseDate}</span>
          <span className="mx-1">•</span>
          <span className="">{album.tracksAmount} songs, {formatTotalDuration(album.totalDuration)}</span>
        </div>
      </div>
    </div>
  );
};