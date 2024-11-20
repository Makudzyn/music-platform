'use client';

import { useAppSelector, useEntityLoader } from '@hooks/hooks';
import { Fragment, useMemo } from 'react';
import AlbumCard from '@/app/features/playlists/albums/AlbumCard';
import CarouselSection from '@/app/features/carousel/CarouselSection';
import { loadAlbums } from '@lib/redux/albumReducer/albumActions';
import AlbumCardSkeleton from '@/app/features/skeletons/AlbumCardSkeleton';
import { Playlist } from '@lib/defenitions';
import {
  selectAlbums,
  selectAlbumsLoading,
} from '@lib/redux/albumReducer/albumSelectors';

export default function AlbumSection() {
  const albums: Playlist[] = useAppSelector(selectAlbums);
  const loading = useAppSelector(selectAlbumsLoading);
  const FETCHED_ALBUMS = '8';

  const actions = useMemo(() => [loadAlbums], []);

  useEntityLoader(FETCHED_ALBUMS, actions);

  if (!albums) return <div>Albums not found</div>;

  const renderAlbum = (album: Playlist) => (
    <Fragment key={album._id}>
      <AlbumCard playlist={album} />
    </Fragment>
  );

  const renderSkeleton = () => <AlbumCardSkeleton />;

  return (
    <CarouselSection<Playlist>
      items={albums}
      renderItem={loading ? renderSkeleton : renderAlbum}
    />
  );
}
