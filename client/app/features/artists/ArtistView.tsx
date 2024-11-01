import { useAppSelector, useEntityLoader, useUpdateQueue } from "@/lib/hooks/hooks";
import { Fragment, MutableRefObject, useMemo } from "react";
import ArtistHeader from "@/app/features/artists/ArtistHeader";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";
import TrackListGeneric from "@/app/features/tracks/TrackListGeneric";
import CarouselSection from "@/app/features/carousel/CarouselSection";
import AlbumCard from "@/app/features/playlists/albums/AlbumCard";
import { loadTracksByArtistId } from "@/lib/redux/trackReducer/trackActions";
import { loadAlbumsByArtistId } from "@/lib/redux/albumReducer/albumActions";
import { makeSelectArtistViewData } from "@/lib/redux/artistReducer/artistSelectors";
import { makeSelectAlbumsByArtistId } from "@/lib/redux/albumReducer/albumSelectors";
import { makeSelectTracksByArtistId } from "@/lib/redux/trackReducer/trackSelectors";
import { loadArtistById } from "@/lib/redux/artistReducer/artistActions";

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

  const selectTracksByArtistId = useMemo(
    () => makeSelectTracksByArtistId(artistId),
    [artistId]
  )

  const {artist} = useAppSelector(selectArtistViewData);
  const {tracks} = useAppSelector(selectTracksByArtistId);
  const {albums} = useAppSelector(selectAlbumsByArtistId);

  const actions = useMemo(
    () => [
      loadArtistById,
      loadTracksByArtistId,
      loadAlbumsByArtistId
    ],
    []
  );

  useEntityLoader(artistId, actions);
  useUpdateQueue(tracks);

  if (!artist) {
    return <div>Artist not found</div>;
  }
  if (!albums) {
    return <div>Albums not found</div>;
  }

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