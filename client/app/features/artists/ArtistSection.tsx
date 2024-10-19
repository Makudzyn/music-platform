'use client';

import { useAppDispatch, useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks";
import { Fragment, useEffect, useMemo } from "react";
import { loadArtistById, loadArtists } from "@/lib/reducers/artistSlice";
import ArtistCard from "@/app/features/artists/ArtistCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";
import { loadTracksByArtistId } from "@/lib/reducers/trackSlice";

export default function ArtistSection() {
  const {artists, loading, error} = useAppSelector(state => state.artists);
  const FETCHED_ARTISTS = "8";

  const actions = useMemo(
    () => [loadArtists],
    []
  );

  useEntityLoader(FETCHED_ARTISTS, actions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!artists) return <div>Artists not found</div>;

  const renderArtist = (artist) => (
    <Fragment key={artist._id}>
      <ArtistCard artist={artist}/>
    </Fragment>
  );

  return (
    <CarouselSection
      items={artists}
      renderItem={renderArtist}
    />
  );
}