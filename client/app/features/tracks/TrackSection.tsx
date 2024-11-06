'use client';

import {
  useAppSelector,
  useEntityLoader,
  useUpdateQueue,
} from '@/lib/hooks/hooks';
import { Fragment, useMemo } from 'react';
import TrackCard from '@/app/features/tracks/TrackCard';
import CarouselSection from '@/app/features/carousel/CarouselSection';
import { loadTracks } from '@/lib/redux/trackReducer/trackActions';
import TrackCardSkeleton from '@/app/features/skeletons/TrackCardSkeleton';
import { Track } from '@/lib/defenitions';

export default function TrackSection() {
  const { tracks, loading } = useAppSelector((state) => state.tracks);
  const FETCHED_TRACKS = '24';

  const actions = useMemo(() => [loadTracks], []);

  useEntityLoader(FETCHED_TRACKS, actions);
  useUpdateQueue(tracks);

  if (!tracks) return <div>Tracks not found</div>;

  const renderTrack = (track: Track) => (
    <Fragment key={track._id}>
      <TrackCard track={track} />
    </Fragment>
  );

  const renderSkeleton = () => <TrackCardSkeleton />;

  return (
    <CarouselSection
      items={tracks}
      renderItem={loading ? renderSkeleton : renderTrack}
      itemsPerGroup={3}
    />
  );
}
