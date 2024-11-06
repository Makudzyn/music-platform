'use client';

import Breadcrumbs from '@/app/features/breadcrumbs/Breadcrumbs';
import ScrollWrapper from '@/app/features/scroll/ScrollWrapper';
import { useRef } from 'react';
import ArtistView from '@/app/features/artists/ArtistView';

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
              { title: 'Artists', href: '/artists' },
              { title: 'Current artist' },
            ]}
          />
        </div>
        <ArtistView artistId={id} scrollRef={scrollRef} />
      </div>
    </ScrollWrapper>
  );
}
