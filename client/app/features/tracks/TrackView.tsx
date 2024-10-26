'use client';

import { useMemo } from "react";
import { useAppSelector, useEntityLoader } from "@/lib/hooks";
import TrackHeader from "@/app/features/tracks/TrackHeader";
import TrackLyrics from "@/app/features/tracks/TrackLyrics";
import TrackComments from "@/app/features/tracks/TrackComments";
import { makeSelectTrackViewData } from "@/lib/redux/trackReducer/trackSelectors";
import { loadTrackById } from "@/lib/redux/trackReducer/trackActions";

interface TrackViewProps {
  trackId: string;
}

export default function TrackView({ trackId }: TrackViewProps) {
  const selectTrackViewData = useMemo(
    () => makeSelectTrackViewData(trackId),
    [trackId]
  )

  const {track, loading, error} = useAppSelector(selectTrackViewData);

  const actions = useMemo(() => [loadTrackById], []);

  useEntityLoader(trackId, actions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>
  if (!track) return <div>Track not found</div>;

  return (
    <>
      <TrackHeader track={track}/>
      <TrackLyrics lyrics={track.lyrics}/>
      <TrackComments comments={track.comments}/>
    </>
  );
};