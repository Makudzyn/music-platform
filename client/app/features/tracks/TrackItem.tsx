'use client';

import Image from "next/image";
import { Container, IconButton } from "@mui/material";
import { Track } from "@/app/lib/defenitions";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { nextTrack, pause, play, setCurrentTrack } from "@/app/features/player/playerSlice";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useAppSelector } from "@/app/lib/hooks";
import { formatTime } from "@/app/lib/utils";

interface TrackItemProps {
  track: Track;
  index: number;
}

export default function TrackItem({track, index}: TrackItemProps) {
  const dispatch = useDispatch();
  const {currentPosition, paused, currentTrack} = useAppSelector(state => state.player);
  const isActive = currentTrack && currentTrack._id === track._id;

  const handleTrackChange = (track: Track) => {
    if (isActive) {
      if (paused) {
        dispatch(play());
      } else {
        dispatch(pause());
      }
    } else {
      dispatch(setCurrentTrack(track));
    }
  }

  return (
    <Container sx={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "6px 10px",
    }}>
      <Link href={`tracks/${track._id}`} className="flex items-center w-4/5">
        <div className="min-w-6 h-full flex items-center justify-center mx-1">{index+1}</div>
        <div className={"min-w-80 flex items-center justify-start mx-1"}>
          <Image
            src={`http://localhost:5000/${track.thumbnail}`}
            alt="Song thumbnail"
            className="mr-2 rounded-sm"
            width={48}
            height={48}
          />
          {track.title}
        </div>
        <div className={"min-w-72 h-full flex items-center mx-1"}>
          {track.artist}
        </div>
        <div className={"min-w-48 h-full flex items-center mx-1"}>
          Apr 5, 2024
        </div>
      </Link>
      <div className={"min-w-28 items-center mx-1"}>
        <IconButton
          onClick={() => handleTrackChange(track)}
          sx={{marginX: 1, width: 40, height: 40}}
        >
          {isActive && !paused ? <PauseRoundedIcon/> : <PlayArrowRoundedIcon/>}
        </IconButton>
      </div>
      <div className="flex items-center justify-center w-28 mx-1">
        {isActive ? `${formatTime(currentPosition)} / ${formatTime(track.duration)}` : formatTime(track.duration)}
      </div>
    </Container>
  );
};
