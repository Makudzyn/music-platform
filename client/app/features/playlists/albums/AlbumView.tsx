'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { MutableRefObject, useCallback, useEffect, useMemo } from "react";
import { loadAlbumById, makeSelectAlbumViewData } from "@/lib/reducers/albumSlice";
import { setQueue } from "@/lib/reducers/playerSlice";
import AlbumHeader from "@/app/features/playlists/albums/AlbumHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";

interface AlbumHeaderProps {
  albumId: string;
  scrollRef: MutableRefObject<null>;
}

export default function AlbumView({albumId, scrollRef}: AlbumHeaderProps) {
  const dispatch = useAppDispatch();

  const selectAlbumViewData = useMemo(
    () => makeSelectAlbumViewData(albumId),
    [albumId]
  )

  const {album, tracks, loading, error} = useAppSelector(selectAlbumViewData);

  const loadData = useCallback(() => {
    dispatch(loadAlbumById(albumId))
  }, [dispatch, albumId]);

  const updateQueue = useCallback(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    updateQueue();
  }, [updateQueue]);

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