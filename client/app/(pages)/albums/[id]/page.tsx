'use client';

import Breadcrumbs from '@/app/features/breadcrumbs/Breadcrumbs';
import ScrollWrapper from '@/app/features/scroll/ScrollWrapper';
import { useRef } from 'react';
import AlbumView from '@/app/features/playlists/albums/AlbumView';

export default function Page({ params }: { params: { id: string } }) {
  const scrollRef = useRef(null);
  const id = params.id;

  return (
    <ScrollWrapper scrollRef={scrollRef}>
      <div className="container px-2 py-3">
        <div className="my-2">
          <Breadcrumbs
            items={[
              { title: 'Home', href: '/' },
              { title: 'Albums', href: '/albums' },
              { title: 'Current album' },
            ]}
          />
        </div>
        <AlbumView albumId={id} scrollRef={scrollRef} />
      </div>
    </ScrollWrapper>
  );
}
