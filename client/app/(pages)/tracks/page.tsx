'use client';

import TrackList from "@/app/features/tracks/TrackList";
import Breadcrumbs from "@/app/features/breadcrumbs/Breadcrumbs";
import TrackListHeader from "@/app/features/tracks/TrackListHeader";
import ScrollWrapper from "@/app/features/scroll/ScrollWrapper";
import { useRef } from "react";

export default function Page() {
  const scrollRef = useRef(null);

  return (
    <ScrollWrapper scrollRef={scrollRef}>
      <div className="container px-2 py-3">
        <div className="flex w-full justify-between pt-1 pb-2 mb-0.5">
          <h1 className="text-3xl font-bold">All uploaded songs</h1>
        </div>
        <Breadcrumbs
          items={[
            {title: "Home", href: "/"},
            {title: "Track list"}
          ]}
        />
        <TrackListHeader scrollRef={scrollRef} />
        <TrackList/>
      </div>
    </ScrollWrapper>
  );
};