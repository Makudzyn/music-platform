'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadAlbums } from "@/lib/reducers/albumSlice";
import PlaylistCard from "@/app/features/playlists/PlaylistCard";

export default function AlbumGrid() {
  const dispatch = useAppDispatch();
  const {albums} = useAppSelector(state => state.albums);

  useEffect(() => {
    dispatch(loadAlbums())
  }, [])

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