'use client';

import { useAppSelector, useEntityLoader } from "@/lib/hooks/hooks";
import { Fragment, useMemo } from "react";
import ArtistCard from "@/app/features/artists/ArtistCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";
import { loadArtists } from "@/lib/redux/artistReducer/artistActions";

export default function ArtistSection() {
  const {artists} = useAppSelector(state => state.artists);
  const FETCHED_ARTISTS = "8";

  const actions = useMemo(
    () => [loadArtists],
    []
  );

  useEntityLoader(FETCHED_ARTISTS, actions);

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