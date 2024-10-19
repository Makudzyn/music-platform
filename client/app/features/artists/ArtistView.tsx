import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks";
import { MutableRefObject, useMemo } from "react";
import { loadArtistById, makeSelectArtistViewData } from "@/lib/reducers/artistSlice";
import ArtistHeader from "@/app/features/artists/ArtistHeader";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import { loadTracksByArtistId } from "@/lib/reducers/trackSlice";

interface ArtistViewProps {
  artistId: string;
  scrollRef: MutableRefObject<null>;
}

export default function ArtistView({artistId, scrollRef}: ArtistViewProps) {
  const selectArtistViewData = useMemo(
    () => makeSelectArtistViewData(artistId),
    [artistId]
  );

  const { tracks, artist, loading, error } = useAppSelector(selectArtistViewData);

  const actions = useMemo(
    () => [loadArtistById, loadTracksByArtistId],
    []
  );

  useEntityLoader(artistId, actions);
  useUpdateQueue(tracks);

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