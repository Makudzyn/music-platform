'use client';

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadTracks } from "@/app/features/tracks/trackSlice";
import { setQueue } from "@/app/features/player/playerSlice";
import TrackCard from "@/app/features/tracks/TrackCard";

export default function TrackSection() {
  const dispatch = useAppDispatch();
  const {tracks} = useAppSelector(state => state.tracks);
  const FETCHED_TRACKS = 9;
  useEffect(() => {
    dispatch(loadTracks(FETCHED_TRACKS));
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {tracks.map(track =>
        <Fragment key={track._id}>
          <TrackCard track={track}/>
        </Fragment>
      )}
    </div>
    </div>
  );
};