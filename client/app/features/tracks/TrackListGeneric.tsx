import { Fragment } from "react";
import TrackItem from "@/app/features/tracks/TrackItem";
import { Track } from "@/lib/defenitions";

interface TrackListGenericProps {
  tracks: Track[];
}

export default function TrackListGeneric({tracks}: TrackListGenericProps) {
  if (!tracks || tracks.length === 0 || tracks.some(track => !track.createdAt)) {
    return <div>Loading tracks...</div>;
  }
  return (
      <div
        className="grid grid-cols-[3rem,1.5fr,1fr,1fr,8rem,3.75rem] gap-x-4 gap-y-2 items-center pb-2 rounded-md transition-all">
        {tracks.map((track, index) =>
          <Fragment key={track._id}>
            <TrackItem track={track} index={index}/>
          </Fragment>
        )}
      </div>
  );
};