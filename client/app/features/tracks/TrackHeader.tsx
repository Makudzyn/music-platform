import { Track } from "@/lib/defenitions";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileAudio, Heart, PlayCircle, Share2, Wifi } from "lucide-react";
import Image from "next/image";
import { cn, convertToKbps, formatDate, formatTotalDuration } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import TrackViewButtons from "@/app/features/tracks/TrackViewButtons";

interface TrackHeaderProps {
  track: Track;
}

export default function TrackHeader({track}: TrackHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-end gap-6 md:flex-row md:items-center">
      <div className="relative flex-shrink-0 shadow-lg size-48 md:size-64">
        <Image
          src={`http://localhost:5000/${track.thumbnail}`}
          alt={`${track.title} cover`}
          fill
          className="object-cover rounded-sm"
          sizes="(max-width: 768px) 192px, 256px"
        />
      </div>

      <div className="w-full">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">{track.title}</h1>
        <div className="flex items-center text-sm">
          <Link
            className={cn(
              "font-semibold decoration-foreground hover:underline",
              !track.album && "select-none"
            )}
            href={`/albums/${track.album._id}`}
          >
            {track.album ? track.album.title : 'Single'}
          </Link>

          <span className="mx-1">•</span>

          <Link
            href={`/artists/${track.artist._id}`}
            className="font-semibold decoration-foreground hover:underline"
          >
            {track.artist.name}
          </Link>

          <span className="mx-1">•</span>

          <span className="">{track.listens} listens</span>
        </div>
        <div className="pr-4">
          <Separator className="text-muted-foreground mb-6 mt-2"/>
        </div>
        <TrackViewButtons track={track}/>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4"/>
            <span>Added: {formatDate(track.createdAt)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4"/>
            <span>Duration: {formatTotalDuration(track.duration)}</span>
          </div>
          <div className="flex items-center">
            <Wifi className="mr-2 h-4 w-4"/>
            <span>Bitrate: {convertToKbps(track.bitrate)} kbps</span>
          </div>
          <div className="flex items-center">
            <FileAudio className="mr-2 h-4 w-4"/>
            <span>Format: {track.format || 'undefined'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};