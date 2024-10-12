'use client';

import Breadcrumbs from "@/app/features/breadcrumbs/Breadcrumbs";
import ScrollWrapper from "@/app/features/scroll/ScrollWrapper";
import AlbumGrid from "@/app/features/playlists/albums/AlbumGrid";

export default function Page() {
  return (
    <ScrollWrapper>
      <div className="container px-2 py-3">
        <div className="flex w-full justify-between pt-1 pb-2 mb-0.5">
          <h1 className="text-3xl font-bold">All uploaded albums</h1>
        </div>
        <Breadcrumbs
          items={[
            {title: "Home", href: "/"},
            {title: "Album list"}
          ]}
        />
        <AlbumGrid/>
      </div>
    </ScrollWrapper>
  );
};