'use client';

import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks/hooks";
import { MutableRefObject, useMemo } from "react";
import AlbumHeader from "@/app/features/playlists/albums/AlbumHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";
import { loadTracksByAlbumId } from "@/lib/redux/trackReducer/trackActions";
import { makeSelectAlbumViewData } from "@/lib/redux/albumReducer/albumSelectors";
import { loadAlbumById } from "@/lib/redux/albumReducer/albumActions";
import { makeSelectTracksByAlbumId } from "@/lib/redux/trackReducer/trackSelectors";

interface AlbumViewProps {
  albumId: string;
  scrollRef: MutableRefObject<null>;
}

export default function AlbumView({albumId, scrollRef}: AlbumViewProps) {
  const selectAlbumViewData = useMemo(
    () => makeSelectAlbumViewData(albumId),
    [albumId]
  )

  const selectTracksByAlbumId = useMemo(
    () => makeSelectTracksByAlbumId(albumId),
    [albumId]
  );

  const {album} = useAppSelector(selectAlbumViewData);
  const {tracks} = useAppSelector(selectTracksByAlbumId);

  const actions = useMemo(() => [loadAlbumById, loadTracksByAlbumId], []);

  useEntityLoader(albumId, actions);
  useUpdateQueue(tracks);

  if (!album || !tracks) return null;

  return (
    <>
      <AlbumHeader album={album}/>
      <TrackListHeader scrollRef={scrollRef}/>
      <TrackListGeneric tracks={tracks}/>
    </>
  );
};