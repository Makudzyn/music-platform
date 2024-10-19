'use client';

import { useAppSelector, useEntityLoader } from "@/lib/hooks";
import { Fragment, useMemo } from "react";
import { loadArtists } from "@/lib/reducers/artistSlice";
import ArtistCard from "@/app/features/artists/ArtistCard";

export default function ArtistGrid() {
  const {artists, loading, error} = useAppSelector(state => state.artists);

  const actions = useMemo(
    () => [loadArtists],
    []
  );
  useEntityLoader("0", actions);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!artists) return <div>Artists not found</div>;

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