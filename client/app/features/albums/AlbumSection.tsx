'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { loadAlbums } from "@/lib/reducers/albumSlice";
import AlbumCard from "@/app/features/albums/AlbumCard";

export default function AlbumSection() {
  const dispatch = useAppDispatch();
  const {albums} = useAppSelector(state => state.albums);
  const FETCHED_ALBUMS = 8;

  useEffect(() => {
    dispatch(loadAlbums(FETCHED_ALBUMS))
  }, [])

  return (
    <Carousel opts={{align: 'start', loop: false}} className="py-2 px-2.5 w-full">
      <CarouselContent>
        {albums.map(album => (
          <CarouselItem key={album._id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <AlbumCard album={album}/>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-5 border-none"/>
      <CarouselNext className="mr-5 border-none"/>
    </Carousel>
  );
};