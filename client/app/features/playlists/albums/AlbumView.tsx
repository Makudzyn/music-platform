'use client';

import { useAppSelector, useEntityLoader } from '@/lib/hooks/hooks';
import { MutableRefObject, useMemo } from 'react';
import AlbumHeader from '@/app/features/playlists/albums/AlbumHeader';
import TrackListGeneric from '@/app/features/tracks/TrackListGeneric';
import TrackListHeader from '@/app/features/tracks/TrackListHeader';
import { loadTracksByAlbumId } from '@/lib/redux/trackReducer/trackActions';
import { makeSelectAlbumViewData } from '@/lib/redux/albumReducer/albumSelectors';
import { loadAlbumById } from '@/lib/redux/albumReducer/albumActions';
import { makeSelectTracksByAlbumId } from '@/lib/redux/trackReducer/trackSelectors';
import AlbumHeaderSkeleton from '@/app/features/skeletons/AlbumHeaderSkeleton';
import TrackListGenericSkeleton from '@/app/features/skeletons/TrackListGenericSkeleton';

interface AlbumViewProps {
  albumId: string;
  scrollRef: MutableRefObject<null>;
}

export default function AlbumView({ albumId, scrollRef }: AlbumViewProps) {
  const selectAlbumViewData = useMemo(
    () => makeSelectAlbumViewData(albumId),
    [albumId],
  );

  const selectTracksByAlbumId = useMemo(
    () => makeSelectTracksByAlbumId(albumId),
    [albumId],
  );

  const { album, loading: albumLoading } = useAppSelector(selectAlbumViewData);
  const { tracks, loading: tracksLoading } = useAppSelector(selectTracksByAlbumId);

  const actions = useMemo(() => [loadAlbumById, loadTracksByAlbumId], []);

  useEntityLoader(albumId, actions);

  return (
    <>
      {albumLoading ? (
        <AlbumHeaderSkeleton />
      ) : album ? (
        <AlbumHeader album={album} tracks={tracks} />
      ) : (
        <div>Album not found</div>
      )}

      <TrackListHeader scrollRef={scrollRef} />

      {tracksLoading ? (
        <TrackListGenericSkeleton />
      ) : tracks ? (
        <TrackListGeneric tracks={tracks} />
      ) : (
        <div>Tracks not found</div>
      )}
    </>
  );
}
