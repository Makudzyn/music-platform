'use client';

import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks/hooks";
import { Fragment, useMemo } from "react";
import TrackCard from "@/app/features/tracks/TrackCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";
import { loadTracks } from "@/lib/redux/trackReducer/trackActions";

export default function TrackSection() {
  const {tracks} = useAppSelector(state => state.tracks);
  const FETCHED_TRACKS = "24";

  const actions = useMemo(
    () => [loadTracks],
    []
  );

  useEntityLoader(FETCHED_TRACKS, actions)
  useUpdateQueue(tracks)

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