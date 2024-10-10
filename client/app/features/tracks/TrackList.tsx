'use client';

import { Fragment } from "react";
import TrackItem from "@/app/features/tracks/TrackItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { loadTracks } from "@/lib/reducers/trackSlice";
import { setQueue } from "@/lib/reducers/playerSlice";

export default function TrackList() {
  const dispatch = useAppDispatch();
  const {tracks, loading} = useAppSelector(state => state.tracks);

  useEffect(() => {
    dispatch(loadTracks({}));
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks]);

  if (loading) {
    return <div className="py-4 text-center">Loading...</div>;
  }
  return (
    <div className="grid grid-cols-[3rem,2fr,1fr,1fr,10rem,3rem] gap-x-4 gap-y-2 items-center pb-2 rounded-md transition-all">
      {tracks.map((track, index) =>
        <Fragment key={track._id}>
          <TrackItem track={track} index={index}/>
        </Fragment>
      )}
    </div>
  );
};