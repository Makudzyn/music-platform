'use client';

import { useAppSelector, useEntityLoader } from '@lib/hooks/hooks';
import { Fragment, useMemo } from 'react';
import ArtistCard from '@/app/features/artists/ArtistCard';
import CarouselSection from '@/app/features/carousel/CarouselSection';
import { loadArtists } from '@lib/redux/artistReducer/artistActions';
import ArtistCardSkeleton from '@/app/features/skeletons/ArtistCardSkeleton';
import { Artist } from '@lib/defenitions';
import {
  selectArtistLoading,
  selectArtists,
} from '@lib/redux/artistReducer/artistSelectors';

export default function ArtistSection() {
  const artists: Artist[] = useAppSelector(selectArtists);
  const loading = useAppSelector(selectArtistLoading);
  const FETCHED_ARTISTS = '8';

  const actions = useMemo(() => [loadArtists], []);

  useEntityLoader(FETCHED_ARTISTS, actions);

  if (!artists) return <div>Artists not found</div>;

  const renderArtist = (artist: Artist) => (
    <Fragment key={artist._id}>
      <ArtistCard artist={artist} />
    </Fragment>
  );

  const renderSkeleton = () => <ArtistCardSkeleton />;

  return (
    <CarouselSection<Artist>
      items={artists}
      renderItem={loading ? renderSkeleton : renderArtist}
    />
  );
}
