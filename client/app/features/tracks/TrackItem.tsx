'use client';

import Image from "next/image";
import { Card, IconButton } from "@mui/material";
import { Track } from "@/app/lib/defenitions";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { pause, play, setCurrentTrack } from "@/app/features/player/playerSlice";
import { PauseOutlined, PlayArrowOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { formatTime } from "@/app/lib/utils";


interface TrackItemProps {
  track: Track;
}

export default function TrackItem({track}: TrackItemProps) {
  const dispatch = useDispatch();
  const {currentPosition, totalDuration} = useAppSelector(state => state.player);
  const [active, setActive] = useState<boolean>(false)
  const handleTrackChange = (track: Track) => {
    dispatch(setCurrentTrack(track));
    setActive(prevState => !prevState);
  }
  return (
    <Card
      sx={{display: "flex", justifyContent: "space-between", width: "100%", padding: "8px 12px"}}
    >
      <Link href={`tracks/${track._id}`} className="flex items-center w-2/3">
        <Image
          src={`http://localhost:5000/${track.thumbnail}`}
          alt="Song thumbnail"
          className="mr-2 rounded-sm"
          width={48}
          height={48}
        />
        <div className={"w-80 flex items-center"}>
          {track.artist} - {track.title}
        </div>
      </Link>
      <IconButton onClick={() => handleTrackChange(track)}>
        {active ? <PauseOutlined/> : <PlayArrowOutlined/>}
      </IconButton>
      <div className="flex items-center justify-center w-28 ">
        {active ? `${formatTime(currentPosition)} / ${formatTime(totalDuration)}` : formatTime(totalDuration)}
      </div>
    </Card>
  );
};