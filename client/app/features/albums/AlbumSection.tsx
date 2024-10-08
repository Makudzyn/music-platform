'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadAlbums } from "@/lib/reducers/albumSlice";
import AlbumCard from "@/app/features/albums/AlbumCard";
import CarouselSection from "@/app/features/carousel/CarouselSection";

export default function AlbumSection() {
  const dispatch = useAppDispatch();
  const {albums} = useAppSelector(state => state.albums);
  const FETCHED_ALBUMS = 8;

  useEffect(() => {
    dispatch(loadAlbums(FETCHED_ALBUMS))
  }, [])

  const renderAlbum = (album) => (
    <Fragment key={album._id}>
      <AlbumCard album={album}/>
    </Fragment>
  );

  return (
    <CarouselSection
      items={albums}
      renderItem={renderAlbum}
    />
  );
}