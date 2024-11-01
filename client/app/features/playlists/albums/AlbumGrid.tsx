'use client';

import { useAppSelector, useEntityLoader } from "@/lib/hooks/hooks";
import { Fragment, useMemo } from "react";
import PlaylistCard from "@/app/features/playlists/PlaylistCard";
import { loadAlbums } from "@/lib/redux/albumReducer/albumActions";

export default function AlbumGrid() {
  const {albums} = useAppSelector(state => state.albums);

  const actions = useMemo(
    () => [loadAlbums],
    []
  );

  useEntityLoader("0", actions)

  if (!albums) return <div>Albums not found</div>;

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {albums.map((album) => (
        <Fragment key={album._id}>
          <PlaylistCard playlist={album} />
        </Fragment>
      ))}
    </div>
  )
};