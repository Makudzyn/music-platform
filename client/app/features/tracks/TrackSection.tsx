'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Fragment, useEffect } from "react";
import { loadTracks } from "@/lib/reducers/trackSlice";
import { setQueue } from "@/lib/reducers/playerSlice";
import TrackCard from "@/app/features/tracks/TrackCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function TrackSection() {
  const dispatch = useAppDispatch();
  const {tracks} = useAppSelector(state => state.tracks);
  const FETCHED_TRACKS = 24;

  useEffect(() => {
    dispatch(loadTracks({limit: FETCHED_TRACKS}));
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      dispatch(setQueue(tracks));
    }
  }, [tracks]);

  // Функция для группировки треков по 3
  const groupTracks = (tracks) => {
    const groups = [];
    for (let i = 0; i < tracks.length; i += 3) {
      groups.push(tracks.slice(i, i + 3));
    }
    return groups;
  };

  const trackGroups = groupTracks(tracks);

  return (
    <Carousel opts={{align: 'start', loop: false}} className="py-2 px-2.5 w-full">
      <CarouselContent>
        {trackGroups.map((group, groupIndex) => (
          <CarouselItem key={groupIndex} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <div className="grid grid-cols-1 gap-4">
              {group.map(track => (
                <Fragment key={track._id}>
                  <TrackCard track={track}/>
                </Fragment>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-5 border-none"/>
      <CarouselNext className="mr-5 border-none"/>
    </Carousel>
  );
}