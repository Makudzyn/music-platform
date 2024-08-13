'use client';

import { PauseOutlined, PlayArrowOutlined } from "@mui/icons-material";
import { Track } from "@/app/lib/defenitions";
import TimeSlider from "@/app/ui/player/TimeSlider";
import { Button } from "@mui/material";
import Image from "next/image";

export default function Player() {
  const active = false;
  const track: Track = {
    _id: "1",
    artist: "Death",
    title: "Trapped In A Corner",
    lyrics: "Not added yet",
    listens: 7281,
    audio: "audio/eaa2ee4c-3b8b-4798-b6a2-670eca578444.mp3",
    thumbnail: "/thumbnail/894003a2-4c34-48fc-8ccd-5fd564ba8a24.jpg",
    comments: []
  };

  return (
    <div className="h-[4.5rem] w-full fixed bottom-0 flex flex-row items-center justify-between py-2.5 bg-black gap-2">
      <div className="min-w-44 flex items-center ps-2 w-1/4">
        <div className="flex flex-row justify-start items-center translate-x-0 transition-transform">
          <div className="relative flex-shrink-0 rounded overflow-hidden shadow size-14 bg-gray-700 mr-2">
            <Button>
              <Image src={""} alt={"Song thumbnail"} width={56} height={56}/>
            </Button>
          </div>
          <div className="flex flex-col text-white leading-normal text-sm">
            <div className="text-white">{track.title}</div>
            <div className="text-sub-gray text-xs">{track.artist}</div>
          </div>
        </div>
      </div>
      <TimeSlider currentPosition={2} totalDuration={421} active={active}/>
      <div className="w-1/4">

      </div>


    </div>
  );
};
