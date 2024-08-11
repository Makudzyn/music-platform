import Image from "next/image";
import { Card } from "@mui/material";
import { Track } from "@/app/lib/defenitions";
import Link from "next/link";
import TrackActions from "@/app/ui/tracks/TrackActions";

interface TrackItemProps {
  track: Track;
  active?: boolean
}

export default function TrackItem({track, active = false}: TrackItemProps) {
  return (
    <Card
      sx={{display: "flex", justifyContent: "space-between", width: "100%", padding: "8px 12px"}}
    >
      <Link href={`tracks/${track._id}`} className="flex items-center w-2/3">
        <Image
          src={track.thumbnail}
          alt={"Song thumbnail"}
          className={"mr-2 rounded-sm"}
          width={48}
          height={48}
        />
        <div className={"w-80 flex items-center"}>
          {track.artist} - {track.title}
        </div>
      </Link>
      <TrackActions active={active}/>
      <div className="flex items-center justify-center w-28 ">{active ? `0:48 /` : ""} 4:20</div>
    </Card>
  );
};