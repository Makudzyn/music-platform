'use client';

import Image from "next/image";
import { Track } from "@/lib/defenitions";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { nextTrack, pause, play, setCurrentTrack } from "@/lib/reducers/playerSlice";
import { useAppSelector } from "@/lib/hooks";
import { formatTime } from "@/lib/utils";
import { Pause, Play } from "lucide-react";


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
    <div className="flex justify-between w-full py-1.5 px-2.5">
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
        <div
          onClick={() => handleTrackChange(track)}
          className={"mx-0.5 size-10"}
        >
          {isActive && !paused ? <Pause/> : <Play/>}
        </div>
      </div>
      <div className="flex items-center justify-center w-28 mx-1">
        {isActive ? `${formatTime(currentPosition)} / ${formatTime(track.duration)}` : formatTime(track.duration)}
      </div>
    </div>
  );
};
