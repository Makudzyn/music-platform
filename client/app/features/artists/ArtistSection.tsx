'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadArtists } from "@/lib/reducers/artistSlice";
import ArtistCard from "@/app/features/artists/ArtistCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";

export default function ArtistSection() {
  const dispatch = useAppDispatch();
  const {artists} = useAppSelector(state => state.artists);
  const FETCHED_ARTISTS = 8;

  useEffect(() => {
    dispatch(loadArtists(FETCHED_ARTISTS));
  }, []);

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