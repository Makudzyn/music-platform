import Image from "next/image";
import { Track } from "@/app/lib/defenitions";

interface SongInfoProps {
  currentTrack: Track | null;
}

export default function SongInfo({currentTrack}: SongInfoProps) {
  return (
    <>
      {currentTrack &&
        <div className="flex flex-row justify-start items-center translate-x-0 transition-transform">
          <div className="relative flex-shrink-0 rounded overflow-hidden shadow size-14 mr-2 cursor-pointer">
            <Image
              src={`http://localhost:5000/${currentTrack.thumbnail}`}
              alt={"Song thumbnail"}
              width={56}
              height={56}
            />
          </div>
          <div className="flex flex-col text-foreground leading-normal font-semibold text-sm">
            <div>{currentTrack.title}</div>
            <div className="text-secondary text-xs">{currentTrack.artist}</div>
          </div>
        </div>
      }
    </>
  );
};