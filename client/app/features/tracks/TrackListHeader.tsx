'use client';

import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RefObject, useEffect, useState } from "react";

interface TrackListHeaderProps {
  scrollRef: RefObject<HTMLElement>;
}

export default function TrackListHeader({ scrollRef }: TrackListHeaderProps) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsFixed(true);
      }
    };

    const viewport = scrollRef.current;
    if (viewport) {
      viewport.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollRef]);

  return (
    <>
      <div
        className={`grid grid-cols-[3rem,2fr,1fr,1fr,10rem,3rem] gap-4 items-center mb-2 pt-2 text-base text-muted-foreground bg-background transition-all duration-300 ${
          isFixed ? 'sticky top-0 left-0 right-0 z-10 py-2' : ''
        }`}
      >
        <div className="flex items-center justify-center">#</div>
        <div>Song</div>
        <div>Artist</div>
        <div>Album</div>
        <div>Date added</div>
        <div className="flex items-center justify-center">
          <Clock className="size-4" />
        </div>
      </div>
      <Separator
        className={`mb-2 transition-all duration-300 ${isFixed ? 'sticky top-10 left-0 z-10' : ''}`}
      />
    </>
  );
};