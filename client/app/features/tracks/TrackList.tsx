'use client';

import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks";
import { useMemo } from "react";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import { loadTracks } from "@/lib/redux/trackReducer/trackActions";

export default function TrackList() {
  const {tracks, loading, error} = useAppSelector(state => state.tracks);

  const actions = useMemo(
    () => [loadTracks],
    []
  );

  useEntityLoader("0", actions);
  useUpdateQueue(tracks);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!tracks) return <div>Tracks not found</div>;

  return <TrackListGeneric tracks={tracks}/>
}