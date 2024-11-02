'use client';

import { useMemo } from "react";
import { useAppSelector, useEntityLoader } from "@/lib/hooks/hooks";
import TrackHeader from "@/app/features/tracks/TrackHeader";
import TrackLyrics from "@/app/features/tracks/TrackLyrics";
import TrackComments from "@/app/features/tracks/TrackComments";
import { makeSelectTrackViewData } from "@/lib/redux/trackReducer/trackSelectors";
import { loadTrackById } from "@/lib/redux/trackReducer/trackActions";
import TrackHeaderSkeleton from "@/app/features/skeletons/TrackHeaderSkeleton";
import TrackLyricsSkeleton from "@/app/features/skeletons/TrackLyricsSkeleton";
import TrackCommentsSkeleton from "@/app/features/skeletons/TrackCommentsSkeleton";

interface TrackViewProps {
  trackId: string;
}

export default function TrackView({trackId}: TrackViewProps) {
  const selectTrackViewData = useMemo(
    () => makeSelectTrackViewData(trackId),
    [trackId]
  )

  const {track, loading} = useAppSelector(selectTrackViewData);

  const actions = useMemo(() => [loadTrackById], []);

  useEntityLoader(trackId, actions);

  return (
    <>
      {loading ?
        <>
          <TrackHeaderSkeleton/>
          <TrackLyricsSkeleton/>
          <TrackCommentsSkeleton/>
        </>
        : track ?
          <>
            <TrackHeader track={track}/>
            <TrackLyrics lyrics={track.lyrics}/>
            <TrackComments comments={track.comments}/>
          </>
          : <div>Track not found</div>
      }
    </>
  );
};