'use client';

import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks";
import { MutableRefObject, useMemo } from "react";
import { loadAlbumById, makeSelectAlbumViewData } from "@/lib/reducers/albumSlice";
import AlbumHeader from "@/app/features/playlists/albums/AlbumHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";

interface AlbumHeaderProps {
  albumId: string;
  scrollRef: MutableRefObject<null>;
}

export default function AlbumView({albumId, scrollRef}: AlbumHeaderProps) {
  const selectAlbumViewData = useMemo(
    () => makeSelectAlbumViewData(albumId),
    [albumId]
  )

  const {album, tracks, loading, error} = useAppSelector(selectAlbumViewData);

  const actions = useMemo(
    () => [loadAlbumById],
    []
  );

  useEntityLoader(albumId, actions);
  useUpdateQueue(tracks);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>
  if (!album) return <div>Album not found</div>;

  return (
    <>
      <AlbumHeader album={album}/>
      <TrackListHeader scrollRef={scrollRef}/>
      <TrackListGeneric tracks={tracks}/>
    </>
  );
};