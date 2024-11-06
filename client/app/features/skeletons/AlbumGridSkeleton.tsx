'use client';

import { Fragment } from 'react';
import PlaylistCardSkeleton from '@/app/features/skeletons/PlaylistCardSkeleton';

export default function AlbumGridSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <Fragment key={index}>
          <PlaylistCardSkeleton />
        </Fragment>
      ))}
    </div>
  );
}
