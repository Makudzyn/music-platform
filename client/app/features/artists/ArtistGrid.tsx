'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadArtists } from "@/lib/reducers/artistSlice";
import ArtistCard from "@/app/features/artists/ArtistCard";

export default function ArtistGrid() {
  const dispatch = useAppDispatch();
  const {artists} = useAppSelector(state => state.artists);

  useEffect(() => {
    dispatch(loadArtists())
  }, [])

  return (
    <div className="w-full mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      {artists.map((artist) => (
        <Fragment key={artist._id}>
          <ArtistCard artist={artist}/>
        </Fragment>
      ))}
    </div>
  );
};