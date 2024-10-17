'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { loadTracks } from "@/lib/reducers/trackSlice";
import { setQueue } from "@/lib/reducers/playerSlice";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";

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

  return <TrackListGeneric tracks={tracks}/>
}