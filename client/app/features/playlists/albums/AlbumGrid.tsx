'use client';

import { useAppSelector, useEntityLoader } from '@/lib/hooks/hooks';
import { Fragment, useMemo } from 'react';
import PlaylistCard from '@/app/features/playlists/PlaylistCard';
import { loadAlbums } from '@/lib/redux/albumReducer/albumActions';
import AlbumGridSkeleton from '@/app/features/skeletons/AlbumGridSkeleton';

export default function AlbumGrid() {
  const { albums, loading: albumsLoading } = useAppSelector(
    (state) => state.albums,
  );

  const actions = useMemo(() => [loadAlbums], []);

  useEntityLoader('0', actions);

  return (
    <>
      {albumsLoading ? (
        <AlbumGridSkeleton />
      ) : albums ? (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {albums.map((album) => (
            <Fragment key={album._id}>
              <PlaylistCard playlist={album} />
            </Fragment>
          ))}
        </div>
      ) : (
        <div>Albums not found</div>
      )}
    </>
  );
}
