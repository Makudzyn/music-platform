'use client';

import React from "react";
import TrackItem from "@/app/features/tracks/TrackItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { loadTracks } from "@/lib/reducers/trackSlice";
import { setQueue } from "@/lib/reducers/playerSlice";

export default function TrackList() {
  const dispatch = useAppDispatch();
  const {tracks, loading} = useAppSelector(state => state.tracks);
  useEffect(() => {
    dispatch(loadTracks());
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container flex-col">
      <div className="py-0.5">
        {tracks.map((track, index) =>
          <React.Fragment key={track._id}>
            <TrackItem track={track} index={index}/>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};