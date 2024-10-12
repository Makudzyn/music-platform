'use client';

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { loadTrackById } from "@/lib/reducers/trackSlice";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/app/features/breadcrumbs/Breadcrumbs";

export default function Page({params}: {params: {id: string}}) {
  const dispatch = useAppDispatch();
  const id = params.id;
  const {tracks, loading} = useAppSelector(state => state.tracks);

  useEffect(() => {
    dispatch(loadTrackById(id));
  }, [dispatch, id]);

  const track = tracks.find(track => track._id === id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!track) {
    return <div>Track not found</div>;
  }

  return (
    <div className="container max-w-screen-lg">
      <Breadcrumbs
        items={[
          {title: "Home", href: "/"},
          {title: "Track list", href: "/tracks"},
          {title: "Current track"}
        ]}
      />
      <div>
        <div>
          <Image
            src={`http://localhost:5000/${track.thumbnail}`}
            alt={"Song thumbnail"}
            width={64}
            height={64}
          />
          <div>
            <div>Artist: {track.artist.name}</div>
            <div>title: {track.title}</div>
            <div>Listens: {track.listens}</div>
          </div>
        </div>
        <div>
          <h4>Lyrics</h4>
          <div>{track.lyrics}</div>
        </div>
      </div>
      <div className="container mt-5">
        <h5>
          Share you opinion about this song
        </h5>
        <Textarea placeholder="Your name" className="w-full "/>
        <Textarea placeholder="Your comment..." className="w-full "/>
        <Button>Submit</Button>
      </div>
      <div>
        {track.comments.map(comment =>
          <div key={comment._id}>
            <div>Username: {comment.username}</div>
            <div>{comment.text}</div>
          </div>
        )}
      </div>
    </div>
  );
};