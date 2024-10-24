'use client';

import { useAppSelector, useEntityLoader } from "@/lib/hooks";
import { Fragment, useMemo } from "react";
import { loadAlbums } from "@/lib/reducers/albumSlice";
import AlbumCard from "@/app/features/playlists/albums/AlbumCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";

export default function AlbumSection() {
  const {albums, loading, error} = useAppSelector(state => state.albums);
  const FETCHED_ALBUMS = "8";

  const actions = useMemo(
    () => [loadAlbums],
    []
  );

  useEntityLoader(FETCHED_ALBUMS, actions)

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!albums) return <div>Albums not found</div>;

  const renderAlbum = (album) => (
    <Fragment key={album._id}>
      <AlbumCard playlist={album}/>
    </Fragment>
  );

  return (
    <CarouselSection
      items={albums}
      renderItem={renderAlbum}
    />
  );
}