import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { MutableRefObject, useCallback, useEffect, useMemo } from "react";
import { loadArtistById, makeSelectArtistViewData } from "@/lib/reducers/artistSlice";
import ArtistHeader from "@/app/features/artists/ArtistHeader";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import { loadTracksByArtistId } from "@/lib/reducers/trackSlice";
import { setQueue } from "@/lib/reducers/playerSlice";

interface ArtistViewProps {
  artistId: string;
  scrollRef: MutableRefObject<null>;
}

export default function ArtistView({artistId, scrollRef}: ArtistViewProps) {
  const dispatch = useAppDispatch();

  const selectArtistViewData = useMemo(
    () => makeSelectArtistViewData(artistId),
    [artistId]
  );

  const { tracks, artist, loading, error } = useAppSelector(selectArtistViewData);

  const loadData = useCallback(() => {
    dispatch(loadArtistById(artistId));
    dispatch(loadTracksByArtistId(artistId));
  }, [dispatch, artistId]);

  const updateQueue = useCallback(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [dispatch, tracks]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    updateQueue();
  }, [updateQueue]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  if (!artist) return <div>Artist not found</div>;

  return (
    <>
      <ArtistHeader artist={artist}/>
      <TrackListHeader scrollRef={scrollRef}/>
      <TrackListGeneric tracks={tracks}/>
    </>
  )
}