'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadTracks } from "@/lib/reducers/trackSlice";
import { setQueue } from "@/lib/reducers/playerSlice";
import TrackCard from "@/app/features/tracks/TrackCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";

export default function TrackSection() {
  const dispatch = useAppDispatch();
  const {tracks} = useAppSelector(state => state.tracks);
  const FETCHED_TRACKS = 24;

  useEffect(() => {
    dispatch(loadTracks({limit: FETCHED_TRACKS}));
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks]);

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