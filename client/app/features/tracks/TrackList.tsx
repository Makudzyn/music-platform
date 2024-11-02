'use client';

import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks/hooks";
import { useMemo } from "react";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import { loadTracks } from "@/lib/redux/trackReducer/trackActions";
import TrackListGenericSkeleton from "@/app/features/skeletons/TrackListGenericSkeleton";

export default function TrackList() {
  const {tracks, loading} = useAppSelector(state => state.tracks);

  const actions = useMemo(
    () => [loadTracks],
    []
  );

  useEntityLoader("0", actions);
  useUpdateQueue(tracks);

  return (
    <>
      {loading ? <TrackListGenericSkeleton/>
        : tracks ? <TrackListGeneric tracks={tracks}/>
          : <div>Tracks not found</div>
      }
    </>
  )
}