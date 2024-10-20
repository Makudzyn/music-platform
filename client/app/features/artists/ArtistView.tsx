import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks";
import { Fragment, MutableRefObject, useMemo } from "react";
import { loadArtistById, makeSelectArtistViewData } from "@/lib/reducers/artistSlice";
import ArtistHeader from "@/app/features/artists/ArtistHeader";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import { loadTracksByArtistId } from "@/lib/reducers/trackSlice";
import CarouselSection from "@/app/features/carousel/CarouselSection";
import { loadAlbums, makeSelectAlbumsByArtistId } from "@/lib/reducers/albumSlice";
import AlbumCard from "@/app/features/playlists/albums/AlbumCard";

interface ArtistViewProps {
  artistId: string;
  scrollRef: MutableRefObject<null>;
}

export default function ArtistView({artistId, scrollRef}: ArtistViewProps) {
  const selectArtistViewData = useMemo(
    () => makeSelectArtistViewData(artistId),
    [artistId]
  );

  const selectAlbumsByArtistId = useMemo(
    () => makeSelectAlbumsByArtistId(artistId),
    [artistId]
  );

  const { tracks, artist, loading: artistLoading, error: artistError } = useAppSelector(selectArtistViewData);
  const { albums, loading: albumLoading, error: albumError } = useAppSelector(selectAlbumsByArtistId);

  const artistActions = useMemo(
    () => [loadArtistById, loadTracksByArtistId],
    []
  );

  const albumActions = useMemo(
    () => [loadAlbums],
    []
  )

  useEntityLoader(artistId, artistActions);
  useEntityLoader("0", albumActions);
  useUpdateQueue(tracks);

  if (artistLoading || albumLoading) return <div>Loading...</div>;
  if (artistError || albumError) return <div>Error</div>;
  if (!artist) return <div>Artist not found</div>;
  if (!albums) return <div>Albums not found</div>;

  const renderAlbum = (album) => (
    <Fragment key={album._id}>
      <AlbumCard playlist={album}/>
    </Fragment>
  );

  return (
    <>
      <ArtistHeader artist={artist}/>
      <h2 className="font-bold text-lg leading-6 text-foreground mt-3 mb-1">Albums from this artist</h2>
      <CarouselSection items={albums} renderItem={renderAlbum}/>
      <h2 className="font-bold text-lg leading-6 text-foreground mt-3 mb-1">Featured songs</h2>
      <TrackListHeader scrollRef={scrollRef}/>
      <TrackListGeneric tracks={tracks}/>
    </>
  )
}