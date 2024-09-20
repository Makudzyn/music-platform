'use client';

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useEffect } from "react";
import { loadTrackById } from "@/app/features/tracks/trackSlice";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Page({params}: {params: {id: string}}) {
  const dispatch = useAppDispatch();
  const id = params.id;
  const {tracks, loading} = useAppSelector((state) => state.tracks);
  console.log(tracks);
  const track = tracks[0];
  useEffect(() => {
    dispatch(loadTrackById(id));
    console.log(tracks)
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={"container max-w-screen-lg"}>
      <Breadcrumb aria-label="breadcrumb" className={"mb-2.5"}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              color="inherit"
              href="/"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              color="inherit"
              href="/tracks"
            >
              Tracks
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbPage>Selected track</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <div>
          <Image
            src={`http://localhost:5000/${track.thumbnail}`}
            alt={"Song thumbnail"}
            width={64}
            height={64}
          />
          <div>
            <div>Artist: {track.artist}</div>
            <div>title: {track.title}</div>
            <div>Listens: {track.listens}</div>
          </div>
        </div>
        <div>
          <h4 >Lyrics</h4>
          <div>{track.lyrics}</div>
        </div>
      </div>
      <div className={"container mt-5"}>
        <h5>
          Share you opinion about this song
        </h5>
        <Textarea placeholder="Your name" className={"w-full "}/>
        <Textarea placeholder="Your comment..." className={"w-full "}/>
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