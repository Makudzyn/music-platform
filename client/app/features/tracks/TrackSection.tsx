'use client';

import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks";
import { Fragment, useMemo } from "react";
import { loadTracks } from "@/lib/reducers/trackSlice";
import TrackCard from "@/app/features/tracks/TrackCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";

export default function TrackSection() {
  const {tracks, loading, error} = useAppSelector(state => state.tracks);
  const FETCHED_TRACKS = "24";

  const actions = useMemo(
    () => [loadTracks],
    []
  );

  useEntityLoader(FETCHED_TRACKS, actions)
  useUpdateQueue(tracks)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!tracks) return <div>Tracks not found</div>;

  const renderTrack = (track) => (
    <Fragment key={track._id}>
      <TrackCard track={track}/>
    </Fragment>
  );

  return (
    <CarouselSection
      items={tracks}
      renderItem={renderTrack}
      itemsPerGroup={3}
    />
  );
}